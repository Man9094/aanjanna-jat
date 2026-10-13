import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError";
import { env } from "../config/env";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Handle SyntaxError from malformed JSON
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Malformed JSON request body.",
    });
  }

  // Unknown internal server error
  console.error("[Backend Error]:", err);

  const responseMessage = env.isProduction
    ? "Internal server error"
    : err.message || "Internal server error";

  return res.status(500).json({
    success: false,
    error: responseMessage,
  });
}
