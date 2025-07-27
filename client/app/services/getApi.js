import { apiInstance } from "./apiInstence";

/**
 * Fetch user profile
 * @returns {Promise<object>} - User profile data
 */
export const getProfile = async () => {
  try {
    const response = await apiInstance.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Fetch folder Items
 * @returns {Promise<object>} - User folder data with folder Id
 */
export const getFolderItem = async (folderId) => {
  try {
    const response = await apiInstance.get("/folder/folderItem", {
      params: folderId ? { folderId } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching folder items:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
