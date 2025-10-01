/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import { prisma } from "../../../config/prisma";
import { Request } from "express";

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
  });
};

export const BlogService = {
  createBlog,
  allBlogs,
};
