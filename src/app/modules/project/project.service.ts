/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import { prisma } from "../../../config/prisma";
import { Request } from "express";
import { Prisma } from "../../../generated/prisma";

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

//* MIGHT NEED UPDATE
export const updateProject = async (
  projectId: number,
  payload: Prisma.ProjectUpdateInput
) => {
  return await prisma.project.update({
    where: { id: projectId },
    data: payload,
  });
};

export const deleteProject = async (projectId: number) => {
  return await prisma.project.delete({
    where: { id: projectId },
  });
};

export const ProjectService = {
  createProject,
  allProjects,
  updateProject,
  deleteProject,
};
