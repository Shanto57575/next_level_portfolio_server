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

export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    const pathAfterUpload = parts.slice(uploadIndex + 1).join("/");
    const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
    const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

export const deleteCloudinaryImage = async (
  imageUrl: string
): Promise<void> => {
  try {
    const publicId = getPublicIdFromUrl(imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
