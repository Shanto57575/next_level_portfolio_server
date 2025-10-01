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
exports.BlogController = {
    createBlog,
};
