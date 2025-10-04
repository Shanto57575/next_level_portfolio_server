/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  deleteCloudinaryImage,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";
import { prisma } from "../../../config/prisma";
import { Request } from "express";
import { AppError } from "../../utils/AppError";

export const createProject = async (req: Request) => {
  const imageUrl = await uploadBufferToCloudinary(req.file!.buffer);
  const techStackArray = req.body.tech_stack.split(",");
  const featuredArray = req.body.Features.split(",");

  return prisma.project.create({
    data: {
      ...req.body,
      image: imageUrl,
      tech_stack: techStackArray,
      Features: featuredArray,
    },
  });
};

export const allProjects = async () => {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const updateProject = async (req: Request, newImageUrl?: string) => {
  if (req.body.tech_stack) {
    const techStackArray = req.body.tech_stack.split(",");
    req.body.tech_stack = techStackArray;
  }
  if (req.body.Features) {
    const featuredArray = req.body.Features.split(",");
    req.body.Features = featuredArray;
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: Number(req.params.id) },
    select: { image: true },
  });

  if (!existingProject) {
    throw new AppError(404, "Project not found");
  }

  if (newImageUrl && existingProject?.image) {
    await deleteCloudinaryImage(existingProject.image);
    req.body.image = newImageUrl;
  }

  const updatedProject = await prisma.project.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  return updatedProject;
};

export const deleteProject = async (projectId: number) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { image: true },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  const deletedProject = await prisma.project.delete({
    where: { id: projectId },
  });

  if (project?.image) {
    await deleteCloudinaryImage(project.image);
  }

  return deletedProject;
};

export const ProjectService = {
  createProject,
  allProjects,
  updateProject,
  deleteProject,
};
