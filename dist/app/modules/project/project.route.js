"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const multer_1 = require("../../middlewares/multer");
const project_controller_1 = require("./project.controller");
const envConfig_1 = require("../../../config/envConfig");
const catchAsync_1 = require("../../utils/catchAsync");
const router = express_1.default.Router();
router.post("/create-project", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), multer_1.upload.single("file"), (0, catchAsync_1.catchAsync)(project_controller_1.ProjectController.createProject));
router.get("/all-projects", (0, catchAsync_1.catchAsync)(project_controller_1.ProjectController.allProjects));
router.put("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), multer_1.upload.single("file"), (0, catchAsync_1.catchAsync)(project_controller_1.ProjectController.updateProject));
router.delete("/:id", (0, checkAuth_1.checkAuth)(envConfig_1.envVariables.ADMIN_EMAIL), (0, catchAsync_1.catchAsync)(project_controller_1.ProjectController.deleteProject));
exports.projectRouter = router;
