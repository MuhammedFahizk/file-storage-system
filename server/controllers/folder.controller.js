import CustomError from "../config/errors/CustomError.js";
import { File } from "../models/FIleSchema.js";
import { Folder } from "../models/FolderSchema.js";

/*
 * 1.This function is used to create a new folder.
 * It takes in a folder object with the required properties (name, path, and parentFolderId
 * It returns a promise that resolves with the newly created folder object.
 */

export const createFolder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, parentId } = req.body;

    if (!name) {
      throw new CustomError(
        "Folder name is missing",
        400,
        "Folder name is required"
      );
    }

    const existing = await Folder.findOne({ name, parentId, userId });
    if (existing) {
      throw new CustomError(
        "Duplicate folder",
        409,
        "A folder with this name already exists"
      );
    }

    const folder = await Folder.create({ name, parentId, userId });

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
    const folderId = req.query.folderId || null;

    const files = await File.find({
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
