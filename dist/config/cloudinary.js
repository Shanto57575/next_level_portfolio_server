"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBufferToCloudinary = void 0;
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
