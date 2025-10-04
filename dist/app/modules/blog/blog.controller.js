"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
const cloudinary_1 = require("../../../config/cloudinary");
const AppError_1 = require("../../utils/AppError");
const createBlog = async (req, res) => {
    if (!req.file) {
        throw new AppError_1.AppError(400, "No file uploaded");
    }
    const newBlog = await blog_service_1.BlogService.createBlog(req, req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 201,
        data: newBlog,
        message: "created blog successfully",
    });
};
const allBlogs = async (req, res) => {
    const blogs = await blog_service_1.BlogService.allBlogs();
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: blogs,
        message: "all blogs retrieved successfully",
    });
};
const getBlogById = async (req, res) => {
    const blog = await blog_service_1.BlogService.getBlogById(Number(req.params.id));
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: blog,
        message: "blog retrieved successfully",
    });
};
const updateBlog = async (req, res) => {
    let newImageUrl;
    if (req.file) {
        newImageUrl = await (0, cloudinary_1.uploadBufferToCloudinary)(req.file.buffer);
    }
    const updatedBlog = await blog_service_1.BlogService.updateBlog(Number(req.params.id), req.body, newImageUrl);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: updatedBlog,
        message: "blog updated successfully",
    });
};
const deleteBlog = async (req, res) => {
    await blog_service_1.BlogService.deleteBlog(Number(req.params.id));
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: null,
        message: "blog deleted successfully",
    });
};
exports.BlogController = {
    createBlog,
    allBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
