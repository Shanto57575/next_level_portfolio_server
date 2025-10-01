import { Response } from "express";
interface sendResponseProps {
    res: Response;
    success: boolean;
    statusCode: number;
    data: any;
    message?: string;
}
export declare const sendResponse: ({ res, success, statusCode, data, message, }: sendResponseProps) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=sendResponse.d.ts.map