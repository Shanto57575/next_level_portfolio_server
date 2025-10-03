import express from "express";
import { authRouter } from "../modules/auth/auth.route";
import { blogRouter } from "../modules/blog/blog.route";
import { projectRouter } from "../modules/project/project.route";

export const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRouter,
  },
  {
    path: "/blog",
    element: blogRouter,
  },
  {
    path: "/project",
    element: projectRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.element));
