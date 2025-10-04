import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import { AppError } from "../../utils/AppError";

const createBlog = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(400, "No file uploaded");
  }

  const newBlog = await BlogService.createBlog(req, req.body);

  sendResponse({
    res,
    success: true,
    statusCode: 201,
    data: newBlog,
    message: "created blog successfully",
  });
};

const allBlogs = async (req: Request, res: Response) => {
  const blogs = await BlogService.allBlogs();

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: blogs,
    message: "all blogs retrieved successfully",
  });
};

const getBlogById = async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(Number(req.params.id));

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: blog,
    message: "blog retrieved successfully",
  });
};

const updateBlog = async (req: Request, res: Response) => {
  let newImageUrl: string | undefined;

  if (req.file) {
    newImageUrl = await uploadBufferToCloudinary(req.file.buffer);
  }

  const updatedBlog = await BlogService.updateBlog(
    Number(req.params.id),
    req.body,
    newImageUrl
  );

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: updatedBlog,
    message: "blog updated successfully",
  });
};

const deleteBlog = async (req: Request, res: Response) => {
  await BlogService.deleteBlog(Number(req.params.id));

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: null,
    message: "blog deleted successfully",
  });
};

export const BlogController = {
  createBlog,
  allBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
