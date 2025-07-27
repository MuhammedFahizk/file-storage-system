import { apiInstance } from "./apiInstence";

/**
 * 1.updateProfile API endpoint
 * @param {Object} data - The updated user profile data
 * @returns {Promise} - API response
 */
export const updateProfile = async (data) => {
  try {
    const response = await apiInstance.patch("/profile", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * 2.Rename file
 * @param {Object} data - Should include `fileId` and `newName`
 * @returns {Promise} - API response
 */
export const renameFile = async ({ fileId, newName }) => {
  try {
    const response = await apiInstance.patch(`/file/${fileId}/renameFile`, {
      newName: newName,
    });
    return response.data;
  } catch (error) {
    console.error("Error renaming file:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
