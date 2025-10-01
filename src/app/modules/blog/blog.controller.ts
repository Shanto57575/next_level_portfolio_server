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
  console.log("HI");
  try {
    const blogs = await BlogService.allBlogs();
    console.log("BLOGS++>", blogs);
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

export const BlogController = {
  createBlog,
  allBlogs,
};
