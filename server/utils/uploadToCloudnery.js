import cloudinary from 'cloudinary';
import { ObjectId } from 'mongodb';
import CustomError from '../config/errors/CustomError.js';
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
    throw new CustomError(
      'Error uploading image to Cloudinary',
      400,
      error.message,
    );
  }
};