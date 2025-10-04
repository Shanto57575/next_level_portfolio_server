import express from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { envVariables } from "../../../config/envConfig";
import { upload } from "../../middlewares/multer";
import { catchAsync } from "../../utils/catchAsync";

const router = express.Router();

router.post(
  "/create-blog",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  catchAsync(BlogController.createBlog)
);

router.get("/all-blogs", catchAsync(BlogController.allBlogs));

router.get("/:id", catchAsync(BlogController.getBlogById));

router.put(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  upload.single("file"),
  catchAsync(BlogController.updateBlog)
);

router.delete(
  "/:id",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  catchAsync(BlogController.deleteBlog)
);

export const blogRouter = router;
