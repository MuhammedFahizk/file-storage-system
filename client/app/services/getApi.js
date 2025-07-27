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
export const getFolderItem = async ({ folderId, filter }) => {
  try {
 const params = {
    ...(folderId ? { folderId } : {}),
    ...(filter?.length ? { filter } : {})
  };

  const response = await apiInstance.get("/folder/folderItem", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching folder items:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
