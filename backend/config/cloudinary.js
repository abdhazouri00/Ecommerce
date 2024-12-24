import { v2 as cloudinary } from "cloudinary";

const name = process.env.ClOUD_NAME;
const key = process.env.CLOUD_API_KEY;
const secretKey = process.env.CLOUD_SECRET_KEY;

const connectCloudinary = async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });
};

export default connectCloudinary;
