"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = exports.deleteProject = exports.updateProject = exports.allProjects = exports.createProject = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const cloudinary_1 = require("../../../config/cloudinary");
const prisma_1 = require("../../../config/prisma");
const AppError_1 = require("../../utils/AppError");
const createProject = async (req) => {
    const imageUrl = await (0, cloudinary_1.uploadBufferToCloudinary)(req.file.buffer);
    const techStackArray = req.body.tech_stack.split(",");
    const featuredArray = req.body.Features.split(",");
    return prisma_1.prisma.project.create({
        data: {
            ...req.body,
            image: imageUrl,
            tech_stack: techStackArray,
            Features: featuredArray,
        },
    });
};
exports.createProject = createProject;
const allProjects = async () => {
    return await prisma_1.prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.allProjects = allProjects;
const updateProject = async (req, newImageUrl) => {
    if (req.body.tech_stack) {
        const techStackArray = req.body.tech_stack.split(",");
        req.body.tech_stack = techStackArray;
    }
    if (req.body.Features) {
        const featuredArray = req.body.Features.split(",");
        req.body.Features = featuredArray;
    }
    const existingProject = await prisma_1.prisma.project.findUnique({
        where: { id: Number(req.params.id) },
        select: { image: true },
    });
    if (!existingProject) {
        throw new AppError_1.AppError(404, "Project not found");
    }
    if (newImageUrl && existingProject?.image) {
        await (0, cloudinary_1.deleteCloudinaryImage)(existingProject.image);
        req.body.image = newImageUrl;
    }
    const updatedProject = await prisma_1.prisma.project.update({
        where: { id: Number(req.params.id) },
        data: req.body,
    });
    return updatedProject;
};
exports.updateProject = updateProject;
const deleteProject = async (projectId) => {
    const project = await prisma_1.prisma.project.findUnique({
        where: { id: projectId },
        select: { image: true },
    });
    if (!project) {
        throw new AppError_1.AppError(404, "Project not found");
    }
    const deletedProject = await prisma_1.prisma.project.delete({
        where: { id: projectId },
    });
    if (project?.image) {
        await (0, cloudinary_1.deleteCloudinaryImage)(project.image);
    }
    return deletedProject;
};
exports.deleteProject = deleteProject;
exports.ProjectService = {
    createProject: exports.createProject,
    allProjects: exports.allProjects,
    updateProject: exports.updateProject,
    deleteProject: exports.deleteProject,
};
