import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./auth.interface";
import { setAuthCookie } from "../../utils/setAuthCookie";

const login = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Login Failed",
    });
  }
};

const logout = async (_req: Request, res: Response) => {
  try {
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
  } catch (error) {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      data: error,
      message: "Failed to log out",
    });
  }
};

export const AuthController = {
  login,
  logout,
};
