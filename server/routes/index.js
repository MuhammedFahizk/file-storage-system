import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes.js";
import fileRoute from "./fileRoutes.js"
import folderRoutes from './FolderRoutes.js'

router.use("/user", userRoutes);
router.use("/user/file", fileRoute )
router.use("/user/folder", folderRoutes)

export default router;