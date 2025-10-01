"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.createBlog = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const cloudinary_1 = require("../../../config/cloudinary");
const prisma_1 = require("../../../config/prisma");
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
exports.BlogService = {
    createBlog: exports.createBlog,
};
