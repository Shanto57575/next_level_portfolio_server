"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
const createBlog = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const newBlog = await blog_service_1.BlogService.createBlog(req, req.body);
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 201,
            data: newBlog,
            message: "created blog successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to create blog",
        });
    }
};
const allBlogs = async (req, res) => {
    try {
        const blogs = await blog_service_1.BlogService.allBlogs();
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: blogs,
            message: "all blogs retrieved successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to retrieved all blogs",
        });
    }
};
const getBlogById = async (req, res) => {
    try {
        const blog = await blog_service_1.BlogService.getBlogById(Number(req.params.id));
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: blog,
            message: "blog retrieved successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to retrieved blog",
        });
    }
};
const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await blog_service_1.BlogService.updateBlog(Number(req.params.id), req.body);
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: updatedBlog,
            message: "blog updated successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to update blog",
        });
    }
};
const deleteBlog = async (req, res) => {
    try {
        const blogs = await blog_service_1.BlogService.deleteBlog(Number(req.params.id));
        (0, sendResponse_1.sendResponse)({
            res,
            success: true,
            statusCode: 200,
            data: blogs,
            message: "blog deleted successfully",
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)({
            res,
            success: false,
            statusCode: 500,
            data: error,
            message: "Failed to delete the blog",
        });
    }
};
exports.BlogController = {
    createBlog,
    allBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
