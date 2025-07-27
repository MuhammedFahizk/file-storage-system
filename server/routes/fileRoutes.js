import express from "express";
import fileController from "../controllers/index.js";
import multer from "multer";
import { requireAuthentication } from "../middleware/autchCheck.js";
const upload = multer({
  dest: "./uploads",
  // limits: { fileSize: 1000000 },
});

const routes = express.Router();

routes.post(
  "/createFile",
  requireAuthentication,
  upload.array("files"),
  fileController.createFile
);

routes.patch("/:fileId/renameFile",requireAuthentication, fileController.renameFile )
routes.delete("/:fileId/deleteFile", requireAuthentication, fileController.deleteFile)

export default routes;
