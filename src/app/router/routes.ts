import express from "express";

export const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: express.Router(),
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.element));
