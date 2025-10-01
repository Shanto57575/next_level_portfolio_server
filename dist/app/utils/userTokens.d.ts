import jwt, { JwtPayload } from "jsonwebtoken";
export declare const createUserTokens: (payload: JwtPayload) => {
    accessToken: string;
};
export declare const verifyToken: (token: string, secret: string) => string | jwt.JwtPayload;
//# sourceMappingURL=userTokens.d.ts.map