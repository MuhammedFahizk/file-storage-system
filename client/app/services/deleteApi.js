import { apiInstance } from "./apiInstence";

/**
 * Delete file from server (soft delete or move to trash)
 * @param {Object} data - The data containing file ID or relevant information
 * @returns {Promise<Object>} - API response
 */
export const deleteFile = async ({fileId}) => {
  try {
    const response = await apiInstance.delete(`/file/${fileId}/deleteFile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error.response?.data || new Error(error.message);
  }
};


/**
 * Delete Folder from server 
 * @param {Object} data - The data containing file ID or relevant information
 * @returns {Promise<Object>} - API response
 */
export const deleteFolder = async ({folderId}) => {
  try {
    const response = await apiInstance.delete(`/folder/${folderId}/deleteFolder`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error.response?.data || new Error(error.message);
  }
};