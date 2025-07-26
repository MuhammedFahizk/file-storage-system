import * as authController from './auth.controller.js';
import * as userController from './user.controller.js';
import * as folderController from './folder.controller.js';
import * as fileController from './file.controller.js';
export default {
  ...authController,
  ...userController,
  ...folderController,
  ...fileController,
};
