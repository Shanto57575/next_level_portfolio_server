import express from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { envVariables } from "../../../config/envConfig";
import { upload } from "../../middlewares/multer";

const router = express.Router();

router.post(
  "/create-blog",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  BlogController.createBlog
);

router.get("/all-blogs", BlogController.allBlogs);

router.put(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  BlogController.createBlog
);

router.delete(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  BlogController.createBlog
);

export const blogRouter = router;
