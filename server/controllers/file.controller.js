import CustomError from "../config/errors/CustomError.js";
import { File } from "../models/FIleSchema.js";
import { uploadImageCloudinary } from "../utils/uploadToCloudnery.js";
import fs from 'fs/promises';

export const createFile = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(req);
    
    const userId = req.userId;
    const { parentId } = req.body;
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

      const existing = await File.findOne({
        name: file.originalname,
        parentId: parentId || null,
        userId,
      });

      if (existing) {
        throw new CustomError(
          "File already exists",
          409,
          "A file with this name already exists in this folder."
        );
        continue;
      }
      console.log(file);
      

      const cloudinaryResult = await uploadImageCloudinary(file.path);

      const newFile = await File.create({
        name: file.originalname,
        url: cloudinaryResult.url,
        size: file.size,
        type: fileType,
        userId: userId,
        parent: parentId || null,
      });
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

    // const existing = await File.findOne({ name, parentId, userId });
    // if (existing) {
    //   throw new CustomError("Duplicate file", 409, "A file with this name already exists");
    // }
  } catch (error) {
    console.error("File upload controller error:", error);
    next(error); // Pass error to your error handling middleware
  }
};
