import CustomError from "../config/errors/CustomError.js";
import { File } from "../models/FIleSchema.js";
import { deleteImageCloudinary } from "../utils/deleteImageCloudinary.js";
import { uploadImageCloudinary } from "../utils/uploadToCloudnery.js";
import fs from "fs/promises";
import { ObjectId } from "mongodb";

/* 
1.
This function is used to create a new file.
It takes in the file object, the user id, and the file name as parameters.
It then uses the file object to create a new file in the database.
*/

export const createFile = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(req.body);

    const userId = req.userId;
    const folderId = req.body.folderId;
    console.log(req.files);
    console.log(req.userId);

    if (files && files.length === 0) {
      throw new CustomError(
        "No files were uploaded",
        400,
        "No files were uploaded"
      );
    }

    const uploadedFilesData = [];

    for (const file of files) {
      let fileType;
      if (file.mimetype.startsWith("image/")) {
        fileType = "image";
      } else if (file.mimetype.startsWith("video/")) {
        fileType = "video";
      } else if (file.mimetype === "application/pdf") {
        fileType = "pdf";
      } else {
        console.warn(
          `Skipping unsupported file type: ${file.mimetype} for ${file.originalname}`
        );
        continue;
      }

      const isValidObjectId = (id) =>
        typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

      const existing = await File.findOne({
        name: file.originalname,
        parentId: isValidObjectId(folderId) ? new ObjectId(folderId) : null,
        userId,
      });

      if (existing) {
        throw new CustomError(
          "File already exists",
          409,
          "A file with this name already exists in this folder."
        );
      }
      console.log(file);

      const cloudinaryResult = await uploadImageCloudinary(file.path);

      const newFile = await File.create({
        name: file.originalname,
        url: cloudinaryResult.url,
        size: file.size,
        type: fileType,
        userId: userId,
        
      });

      if (isValidObjectId(folderId)) {
        newFileData.parentId = new ObjectId(folderId);
      }
      uploadedFilesData.push(newFile);

      await fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
    }

    if (uploadedFilesData.length === 0) {
      return res.status(200).json({
        message:
          "No files were uploaded (e.g., all were duplicates or unsupported types).",
        files: [],
      });
    }

    res.status(201).json({
      message: "Files uploaded successfully",
      files: uploadedFilesData,
    });
  } catch (error) {
    console.error("File upload controller error:", error);
    next(error);
  }
};

/* 2.
 * this function use for rename the file name
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const renameFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const userId = req.userId;
    const { newName } = req.body;

    if (!newName || typeof newName !== "string") {
      throw new CustomError(
        "Invalid name",
        400,
        "New name must be a non-empty string."
      );
    }

    const file = await File.findOne({ _id: new ObjectId(fileId) });

    if (!file) {
      throw new CustomError(
        "File not found",
        404,
        "No file with this ID exists for the user."
      );
    }

    // Check if another file with the same name already exists
    const exists = await File.findOne({
      name: newName,
      parentId: file.parentId,
      userId,
    });

    if (exists) {
      throw new CustomError(
        "Duplicate name",
        409,
        "A file with this name already exists in the same folder."
      );
    }

    file.name = newName;
    await file.save();

    res.status(200).json({
      message: "File renamed successfully",
      file,
    });
  } catch (error) {
    console.error("Rename file error:", error);
    next(error);
  }
};

/*
 * 3.
 * This function is used to delete a file
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const deleteFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const userId = req.userId;

    const file = await File.findOne({ _id: new ObjectId(fileId), userId });

    if (!file) {
      throw new CustomError(
        "File not found",
        404,
        "No file with this ID exists for the user."
      );
    }

    const result = await deleteImageCloudinary(file.url);

    if (result.result === "ok") {
      await File.deleteOne({ _id: fileId, userId });

      res.status(200).json({
        message: "File deleted successfully",
        deletedFile: file,
      });
    } else {
      throw new CustomError(
        "Cloudinary deletion failed",
        500,
        "Error deleting file from Cloudinary"
      );
    }

    res.status(200).json({
      message: "File deleted successfully",
      fileId,
    });
  } catch (error) {
    console.error("Delete file error:", error);
    next(error);
  }
};
