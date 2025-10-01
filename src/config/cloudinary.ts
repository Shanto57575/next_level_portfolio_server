import { v2 as cloudinary } from "cloudinary";
import { envVariables } from "./envConfig";

cloudinary.config({
  cloud_name: envVariables.CLOUDINARY_CLOUD_NAME as string,
  api_key: envVariables.CLOUDINARY_API_KEY as string,
  api_secret: envVariables.CLOUDINARY_SECRET_KEY as string,
});

export const uploadBufferToCloudinary = (buffer: Buffer, folder = "blogs") => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};
