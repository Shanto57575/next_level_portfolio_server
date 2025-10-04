/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import { prisma } from "../../../config/prisma";
import { IUser } from "./auth.interface";
import { createUserTokens } from "../../utils/userTokens";
import { AppError } from "../../utils/AppError";

const loginService = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: { email: email as string },
  });

  if (!isUserExists) {
    throw new AppError(404, "User Not Found");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  const jwtPayload = {
    id: isUserExists.id,
    email: isUserExists.email,
  };

  const userTokens = createUserTokens(jwtPayload);
  const { password: pass, ...rest } = isUserExists;

  return {
    userTokens,
    user: rest,
  };
};

const getMeService = async (email: string) => {
  const userInfo = await prisma.user.findUnique({
    where: { email },
  });

  if (!userInfo) {
    throw new AppError(404, "User Not Found");
  }

  const { password: pass, ...rest } = userInfo;

  return rest;
};

export const AuthService = {
  loginService,
  getMeService,
};
