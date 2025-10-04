"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCloudinaryImage = exports.getPublicIdFromUrl = exports.uploadBufferToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const envConfig_1 = require("./envConfig");
cloudinary_1.v2.config({
    cloud_name: envConfig_1.envVariables.CLOUDINARY_CLOUD_NAME,
    api_key: envConfig_1.envVariables.CLOUDINARY_API_KEY,
    api_secret: envConfig_1.envVariables.CLOUDINARY_SECRET_KEY,
});
const uploadBufferToCloudinary = (buffer, folder = "blogs") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve(result.secure_url);
        });
        uploadStream.end(buffer);
    });
};
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
const getPublicIdFromUrl = (url) => {
    try {
        const parts = url.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1)
            return null;
        const pathAfterUpload = parts.slice(uploadIndex + 1).join("/");
        const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
        const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
        return publicId;
    }
    catch (error) {
        console.error("Error extracting public_id:", error);
        return null;
    }
};
exports.getPublicIdFromUrl = getPublicIdFromUrl;
const deleteCloudinaryImage = async (imageUrl) => {
    try {
        const publicId = (0, exports.getPublicIdFromUrl)(imageUrl);
        if (publicId) {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
    }
    catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
    }
};
exports.deleteCloudinaryImage = deleteCloudinaryImage;
