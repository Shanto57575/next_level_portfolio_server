import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { upload } from "../../middlewares/multer";
import { ProjectController } from "./project.controller";
import { envVariables } from "../../../config/envConfig";

const router = express.Router();

router.post(
  "/create-project",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  ProjectController.createProject
);

router.get("/all-projects", ProjectController.allProjects);

router.put(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  ProjectController.deleteProject
);

export const projectRouter = router;
