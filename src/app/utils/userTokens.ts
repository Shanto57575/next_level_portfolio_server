import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVariables } from "../../config/envConfig";

export const createUserTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(
    payload,
    envVariables.JWT_ACCESS_SECRET as string,
    {
      expiresIn: envVariables.JWT_ACCESS_EXPIRES,
    } as SignOptions
  );

  return accessToken;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};
