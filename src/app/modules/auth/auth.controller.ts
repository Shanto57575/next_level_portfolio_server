import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./auth.interface";

const login = async (req: Request, res: Response) => {
  const loggedInInfo = await AuthService.loginService(
    req.body as Partial<IUser>
  );

  sendResponse({
    res,
    success: true,
    statusCode: 200,
    data: {
      user: loggedInInfo.user,
      token: loggedInInfo.userToken,
    },
    message: "Login Successful",
  });
};

export const AuthController = {
  login,
};
