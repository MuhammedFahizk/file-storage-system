import CustomError from "../config/errors/CustomError.js";
import { File } from "../models/FIleSchema.js";
import { Folder } from "../models/FolderSchema.js";
import { ObjectId } from "mongodb";

/*
 * 1.This function is used to create a new folder.
 * It takes in a folder object with the required properties (name, path, and parentFolderId
 * It returns a promise that resolves with the newly created folder object.
 */

export const createFolder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, folderId } = req.body;

    if (!name) {
      throw new CustomError(
        "Folder name is missing",
        400,
        "Folder name is required"
      );
    }

    const existing = await Folder.findOne({
      name,
      parentId: folderId ? new ObjectId(folderId) : null,
      userId,
    });
    if (existing) {
      throw new CustomError(
        "Duplicate folder",
        409,
        "A folder with this name already exists"
      );
    }

    const folder = await Folder.create({
      name,
      parentId: folderId ? new ObjectId(folderId) : null,
      userId,
    });

    res.status(201).json({
      message: "Folder created successfully",
      folder,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * 2.This function is used to get all folders for a user.
 * It takes in a request object and a response object.
 * It returns a promise that resolves with an array of folder objects.
 */
export const getFolderItems = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(req.params, req.query);

    const folderId = req.query.folderId || null;
    const { filter } = req.query;

    const files = await File.find({
      type: {
        $in:
          Array.isArray(filter) && filter.length
            ? filter
            : ["image", "pdf", "video"],
      },
      userId: userId,
      parentId: folderId,
    }).sort({ name: 1 });

    const folders = await Folder.find({
      userId: userId,
      parentId: folderId,
    }).sort({ name: 1 });

    const items = [
      ...folders.map((folder) => ({
        ...folder.toObject(),
        itemType: "folder",
      })),
      ...files.map((file) => ({ ...file.toObject(), itemType: "file" })),
    ];

    res.status(200).json({
      message: "Items fetched successfully",
      items: items,
    });
  } catch (error) {
    console.error("Error fetching folder items:", error);
    next(error); // Pass to your error handling middleware
  }
};

/* 3.
 * this function use for rename the Folder name
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const renameFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const userId = req.userId;
    const { newName } = req.body;

    if (!newName || typeof newName !== "string") {
      throw new CustomError(
        "Invalid name",
        400,
        "New name must be a non-empty string."
      );
    }

    const folder = await Folder.findOne({ _id: new ObjectId(folderId) });

    if (!folder) {
      throw new CustomError(
        "File not found",
        404,
        "No file with this ID exists for the user."
      );
    }

    // Check if another file with the same name already exists
    const exists = await Folder.findOne({
      name: newName,
      parentId: folder.parentId,
      userId,
    });

    if (exists) {
      throw new CustomError(
        "Duplicate name",
        409,
        "A file with this name already exists in the same folder."
      );
    }

    folder.name = newName;
    await folder.save();

    res.status(200).json({
      message: "File renamed successfully",
      folder,
    });
  } catch (error) {
    console.error("Rename file error:", error);
    next(error);
  }
};

/*
 * 4.
 * This function is used to delete a folder
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const deleteFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const userId = req.userId;
    const folder = await Folder.findOne({ _id: new ObjectId(folderId), userId });

    if (!folder) {
      throw new CustomError(
        "Folder not found",
        404,
        "No file with this ID exists for the user."
      );
    }
        await deleteFolderRecursively(folderId);

      res.status(200).json({
        message: "File deleted successfully",
        deletedFolder: folder,
      });
    
  } catch (error) {
    console.error("Delete file error:", error);
    next(error);
  }
};



const deleteFolderRecursively = async (folderId) => {
  const subFolders = await Folder.find({ parentId: folderId });

  await Promise.all(
    subFolders.map(async (sub) => {
      await deleteFolderRecursively(sub._id);
    })
  );

  const files = await File.find({ parentId: folderId });

  await Promise.all(
    files.map(async (file) => {
      try {
        await deleteImageCloudinary(file.url); // your Cloudinary delete logic
      } catch (err) {
        console.error(`Cloudinary deletion failed for ${file.url}:`, err);
      }
    })
  );

  await File.deleteMany({ parentId: folderId });

  await Folder.findByIdAndDelete(folderId);
};