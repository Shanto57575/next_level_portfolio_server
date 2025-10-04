import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { upload } from "../../middlewares/multer";
import { ProjectController } from "./project.controller";
import { envVariables } from "../../../config/envConfig";
import { catchAsync } from "../../utils/catchAsync";

const router = express.Router();

router.post(
  "/create-project",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  catchAsync(ProjectController.createProject)
);

router.get("/all-projects", catchAsync(ProjectController.allProjects));

router.put(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  catchAsync(ProjectController.updateProject)
);

router.delete(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  catchAsync(ProjectController.deleteProject)
);

export const projectRouter = router;
