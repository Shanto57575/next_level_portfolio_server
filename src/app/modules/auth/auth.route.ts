import express from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { envVariables } from "../../../config/envConfig";
import { catchAsync } from "../../utils/catchAsync";

const router = express.Router();

router.post("/login", catchAsync(AuthController.login));

router.get("/logout", catchAsync(AuthController.logout));

router.get(
  "/me",
  checkAuth(envVariables.ADMIN_EMAIL as string),
  catchAsync(AuthController.getMe)
);

export const authRouter = router;
