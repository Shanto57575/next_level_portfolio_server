import { Response } from "express";

interface ITokenInfo {
  accessToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: ITokenInfo) => {
  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
