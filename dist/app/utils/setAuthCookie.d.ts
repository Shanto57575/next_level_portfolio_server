import { Response } from "express";
interface ITokenInfo {
    accessToken?: string;
}
export declare const setAuthCookie: (res: Response, tokenInfo: ITokenInfo) => void;
export {};
//# sourceMappingURL=setAuthCookie.d.ts.map