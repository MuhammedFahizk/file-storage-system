import CustomError from "../config/errors/CustomError.js";
import { Folder } from "../models/FolderSchema.js";

export const createFolder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, parentId } = req.body;

    if (!name) {
      throw new CustomError("Folder name is missing", 400, "Folder name is required");
    }

    const existing = await Folder.findOne({ name, parentId, userId });
    if (existing) {
      throw new CustomError("Duplicate folder", 409, "A folder with this name already exists");
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
