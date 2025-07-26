import express from "express";
import folderController from "../controllers/index.js";
const router = express.Router();

router.post("/createFolder", folderController.createFolder);

export default router;
