/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

interface sendResponseProps {
  res: Response;
  success: boolean;
  statusCode: number;
  data: any;
  message?: string;
}

export const sendResponse = ({
  res,
  success,
  statusCode,
  data,
  message,
}: sendResponseProps) => {
  return res.status(statusCode).json({
    success,
    data,
    message,
  });
};
