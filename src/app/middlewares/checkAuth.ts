import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/userTokens";
import { envVariables } from "../../config/envConfig";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/prisma";

export const checkAuth =
  (email: string) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new Error("Token Not Found");
    }

    const verifiedToken = verifyToken(
      accessToken as unknown as string,
      envVariables.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const isUserExists = await prisma.user.findUnique({
      where: { id: verifiedToken.id },
    });

    if (!isUserExists) {
      throw new Error("User Not Found");
    }

    if (verifiedToken.email !== email) {
      throw new Error("unauthorized access");
    }

    req.user = verifiedToken;

    next();
  };
