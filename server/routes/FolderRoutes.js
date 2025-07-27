import express from "express";
import folderController from "../controllers/index.js";
import { requireAuthentication } from "../middleware/autchCheck.js";
const router = express.Router();


/**
 *1.
 *  @route POST /api/users/folder/createFolder
 * 
 */
router.post("/createFolder", requireAuthentication, folderController.createFolder);


router.get("/folderItem", requireAuthentication, folderController.getFolderItems)


export default router;
