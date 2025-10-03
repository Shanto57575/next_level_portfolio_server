import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newBlog = await BlogService.createBlog(req, req.body);

    sendResponse({
      res,
      success: true,
      statusCode: 201,
      data: newBlog,
      message: "created blog successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to create blog",
    });
  }
};

const allBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.allBlogs();
    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: blogs,
      message: "all blogs retrieved successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to retrieved all blogs",
    });
  }
};

const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.getBlogById(Number(req.params.id));
    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: blog,
      message: "blog retrieved successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to retrieved blog",
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await BlogService.updateBlog(
      Number(req.params.id),
      req.body
    );
    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: updatedBlog,
      message: "blog updated successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to update blog",
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    await BlogService.deleteBlog(Number(req.params.id));

    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: null,
      message: "blog deleted successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to delete the blog",
    });
  }
};

export const BlogController = {
  createBlog,
  allBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
