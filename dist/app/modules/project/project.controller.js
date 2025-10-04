"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const project_service_1 = require("./project.service");
const cloudinary_1 = require("../../../config/cloudinary");
const AppError_1 = require("../../utils/AppError");
const createProject = async (req, res) => {
    if (!req.file) {
        throw new AppError_1.AppError(400, "No file uploaded");
    }
    const newProject = await project_service_1.ProjectService.createProject(req);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 201,
        data: newProject,
        message: "Added project successfully",
    });
};
const allProjects = async (_req, res) => {
    const projects = await project_service_1.ProjectService.allProjects();
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: projects,
        message: "all projects retrieved successfully",
    });
};
const updateProject = async (req, res) => {
    let newImageUrl;
    if (req.file) {
        newImageUrl = await (0, cloudinary_1.uploadBufferToCloudinary)(req.file.buffer);
    }
    const updatedProject = await project_service_1.ProjectService.updateProject(req, newImageUrl);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: updatedProject,
        message: "project updated successfully",
    });
};
const deleteProject = async (req, res) => {
    await project_service_1.ProjectService.deleteProject(Number(req.params.id));
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        statusCode: 200,
        data: null,
        message: "project deleted successfully",
    });
};
exports.ProjectController = {
    createProject,
    allProjects,
    updateProject,
    deleteProject,
};
