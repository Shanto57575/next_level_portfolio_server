import express from "express";
import { authRouter } from "../modules/auth/auth.route";

export const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.element));
