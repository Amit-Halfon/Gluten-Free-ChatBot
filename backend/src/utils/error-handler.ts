import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import config from "../config/config.js";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UnauthorizedError) {
    res.status(error.statusCode).json({
      error: {
        messege: error.message,
        code: "code" in error ? error.code : "ERR_AUTH",
      },
    });
    return;
  }
  // Handle other errors
  res.status(500).json({ message: "Internal Server Error" });
}
