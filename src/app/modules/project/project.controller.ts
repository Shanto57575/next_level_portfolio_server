import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { uploadBufferToCloudinary } from "../../../config/cloudinary";

const createProject = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newProject = await ProjectService.createProject(req);

    sendResponse({
      res,
      success: true,
      statusCode: 201,
      data: newProject,
      message: "Added project successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to add project",
    });
  }
};

const allProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await ProjectService.allProjects();

    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: projects,
      message: "all projects retrieved successfully",
    });
  } catch (error) {
    console.log("error=>", error);
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to retrieved all projects",
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    let newImageUrl: string | undefined;

    if (req.file) {
      newImageUrl = await uploadBufferToCloudinary(req.file.buffer);
    }

    const updatedProject = await ProjectService.updateProject(req, newImageUrl);

    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: updatedProject,
      message: "project updated successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to update project",
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    await ProjectService.deleteProject(Number(req.params.id));

    sendResponse({
      res,
      success: true,
      statusCode: 200,
      data: null,
      message: "project deleted successfully",
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to delete project",
    });
  }
};

export const ProjectController = {
  createProject,
  allProjects,
  updateProject,
  deleteProject,
};
