import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const loggedInInfo = await AuthService.loginService(
    req.body as Partial<IUser>
  );

  res.cookie("accessToken", loggedInInfo.userTokens.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: {
      user: loggedInInfo.user,
      token: loggedInInfo.userTokens.accessToken,
    },
    message: "Login Successful",
  });
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: null,
    message: "Logged out Successfully",
  });
};

const getMe = async (req: Request, res: Response) => {
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
