import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import { AppError } from "../../utils/AppError";

const createProject = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(400, "No file uploaded");
  }

  const newProject = await ProjectService.createProject(req);

  sendResponse({
    res,
    success: true,
    statusCode: 201,
    data: newProject,
    message: "Added project successfully",
  });
};

const allProjects = async (_req: Request, res: Response) => {
  const projects = await ProjectService.allProjects();

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: projects,
    message: "all projects retrieved successfully",
  });
};

const updateProject = async (req: Request, res: Response) => {
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
};

const deleteProject = async (req: Request, res: Response) => {
  await ProjectService.deleteProject(Number(req.params.id));

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: null,
    message: "project deleted successfully",
  });
};

export const ProjectController = {
  createProject,
  allProjects,
  updateProject,
  deleteProject,
};
