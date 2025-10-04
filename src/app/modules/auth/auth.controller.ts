/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./auth.interface";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { JwtPayload } from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInInfo = await AuthService.loginService(
    req.body as Partial<IUser>
  );

  setAuthCookie(res, loggedInInfo.userTokens);

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: loggedInInfo.user,
    message: "Login Successful",
  });
};

const logout = async (_req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: null,
    message: "logged out Successfully",
  });
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.user as JwtPayload;
  const result = await AuthService.getMeService(decodedToken.email);

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: result,
    message: "userInfo retrieved Successfully",
  });
};

export const AuthController = {
  login,
  logout,
  getMe,
};
