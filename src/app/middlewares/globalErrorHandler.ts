/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVariables } from "../../config/envConfig";
import { AppError } from "../utils/AppError";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVariables.NODE_ENV === "development") {
    console.log(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something Went Wrong!!";

  // Handle Prisma errors
  if (err.code === "P2002") {
    statusCode = 409;
    message = "Duplicate entry found";
  }

  if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
  }

  if (err.code === "P2003") {
    statusCode = 400;
    message = "Foreign key constraint failed";
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  // Handle AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err: envVariables.NODE_ENV === "development" ? err : null,
    stack: envVariables.NODE_ENV === "development" ? err.stack : null,
  });
};
