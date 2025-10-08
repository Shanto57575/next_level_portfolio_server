import express from "express";
import { AuthController } from "./auth.controller";
import { catchAsync } from "../../utils/catchAsync";

const router = express.Router();

router.post("/login", catchAsync(AuthController.login));

export const authRouter = router;
