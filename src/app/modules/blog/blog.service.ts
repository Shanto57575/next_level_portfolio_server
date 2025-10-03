/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  deleteCloudinaryImage,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";
import { prisma } from "../../../config/prisma";
import { Request } from "express";
import { Prisma } from "../../../generated/prisma";

export const createBlog = async (
  req: Request,
  payload: { title: string; content: string }
) => {
  const imageUrl = await uploadBufferToCloudinary(req.file!.buffer);

  return prisma.blog.create({
    data: {
      title: payload.title,
      content: payload.content,
      image: imageUrl,
      authorId: req.user!.id,
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

export const allBlogs = async () => {
  return await prisma.blog.findMany({
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

export const getBlogById = async (blogId: number) => {
  return await prisma.blog.findUnique({
    where: { id: blogId },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const updateBlog = async (
  blogId: number,
  payload: Prisma.BlogUpdateInput,
  newImageUrl?: string
) => {
  const existingBlog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { image: true },
  });

  if (newImageUrl && existingBlog?.image) {
    await deleteCloudinaryImage(existingBlog.image);
    payload.image = newImageUrl;
  }

  return await prisma.blog.update({
    where: { id: blogId },
    data: payload,
  });
};

export const deleteBlog = async (blogId: number) => {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { image: true },
  });

  const deletedBlog = await prisma.blog.delete({
    where: { id: blogId },
  });

  if (blog?.image) {
    await deleteCloudinaryImage(blog.image);
  }

  return deletedBlog;
};

export const BlogService = {
  createBlog,
  allBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
