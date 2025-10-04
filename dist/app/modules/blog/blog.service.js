"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.allBlogs = exports.createBlog = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const cloudinary_1 = require("../../../config/cloudinary");
const prisma_1 = require("../../../config/prisma");
const AppError_1 = require("../../utils/AppError");
const createBlog = async (req, payload) => {
    const imageUrl = await (0, cloudinary_1.uploadBufferToCloudinary)(req.file.buffer);
    return prisma_1.prisma.blog.create({
        data: {
            title: payload.title,
            content: payload.content,
            image: imageUrl,
            authorId: req.user.id,
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    });
};
exports.createBlog = createBlog;
const allBlogs = async () => {
    return await prisma_1.prisma.blog.findMany({
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.allBlogs = allBlogs;
const getBlogById = async (blogId) => {
    const blog = await prisma_1.prisma.blog.findUnique({
        where: { id: blogId },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!blog) {
        throw new AppError_1.AppError(404, "Blog not found");
    }
    return blog;
};
exports.getBlogById = getBlogById;
const updateBlog = async (blogId, payload, newImageUrl) => {
    const existingBlog = await prisma_1.prisma.blog.findUnique({
        where: { id: blogId },
        select: { image: true },
    });
    if (!existingBlog) {
        throw new AppError_1.AppError(404, "Blog not found");
    }
    if (newImageUrl && existingBlog?.image) {
        await (0, cloudinary_1.deleteCloudinaryImage)(existingBlog.image);
        payload.image = newImageUrl;
    }
    return await prisma_1.prisma.blog.update({
        where: { id: blogId },
        data: payload,
    });
};
exports.updateBlog = updateBlog;
const deleteBlog = async (blogId) => {
    const blog = await prisma_1.prisma.blog.findUnique({
        where: { id: blogId },
        select: { image: true },
    });
    if (!blog) {
        throw new AppError_1.AppError(404, "Blog not found");
    }
    const deletedBlog = await prisma_1.prisma.blog.delete({
        where: { id: blogId },
    });
    if (blog?.image) {
        await (0, cloudinary_1.deleteCloudinaryImage)(blog.image);
    }
    return deletedBlog;
};
exports.deleteBlog = deleteBlog;
exports.BlogService = {
    createBlog: exports.createBlog,
    allBlogs: exports.allBlogs,
    getBlogById: exports.getBlogById,
    updateBlog: exports.updateBlog,
    deleteBlog: exports.deleteBlog,
};
