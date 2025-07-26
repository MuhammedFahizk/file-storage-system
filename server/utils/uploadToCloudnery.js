import cloudinary from 'cloudinary';
import { ObjectId } from 'mongodb';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageCloudinary = async (file) => {
  try {

    
    const result = await cloudinary.uploader.upload(file, {
      folder: 'Posts'
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};