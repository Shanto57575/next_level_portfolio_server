import { Response } from "express";

interface ITokenInfo {
  accessToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: ITokenInfo) => {
  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
