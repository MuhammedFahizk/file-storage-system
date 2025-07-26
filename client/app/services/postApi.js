import { apiInstance } from "./apiInstence";


/**
 * Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the account
 * @param {string} data.password - Password
 * 
 */
export const loginUser = async (data) => {
 

  try {
    const response = await apiInstance.post("/login", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Signup API endpoint
 * @param {object} data - Credentials to create account
 * @param {string} data.username - username
 * @param {string} data.email - Email
 * @param {string} data.password - Password
 */
export const signupUser = async (data) => {
    try {
      const response = await apiInstance.post("/register", data);
      return response.data;  
    } catch (error) {
      console.error(error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };


/**
 * refreshAccessToken API endpoint
 * Refreshes the access token by sending a request to the /reauth endpoint.
 * 
 * @returns {Promise<object>} - The response containing the new access token.
 * @throws {Error} - Throws an error if the refresh request fails.
 */
export const refreshAccessToken = async () => {
    try {
      const response = await apiInstance.post("/reauth", {}, {
        withCredentials: true, // Ensure the cookies are sent with the request
      });
      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  

/**
 * Logout API endpoint
 * @returns {Promise} - No response body
 */
export const logout = async () => {
  try {
    const response = await apiInstance.post("/logout", { 
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};

/**
 * logoutEveryDevice API endpoint
 * @returns {Promise} - No response body
 */
export const logoutEveryDevice = async () => {
  try {
    const response = await apiInstance.post("/master-logout", { 
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};



/**
 * Create Folder API
 * @param {object} data - Folder data
 * @param {string} data.name - Name of the folder
 */
export const createFolder = async (data) => {
  try {
    const response = await apiInstance.post("/folder/createFolder", data);
    console.log("Folder created:", response);
    return response;
  } catch (error) {
    console.error("Create folder error:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Create File API
 * @param {object} data - File data
 * @param {string} data.name - Name of the file
 * @param {string} data.content - File content (optional)
 * @param {string} data.folderId - ID of the folder to place the file in (optional)
 */
export const createFile = async (data) => {
  console.log('data',data);
  try {
    
    const response = await apiInstance.post("/file/createFile", data, {
      
    });
    console.log("File created:", response);
    return response;
  } catch (error) {
    console.error("Create file error:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};




