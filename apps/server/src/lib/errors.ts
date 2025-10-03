import type { Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export const Errors = {
  UNAUTHORIZED: new AppError({
    message: "Authentication required",
    statusCode: 403,
  }),
  INTERNAL_SERVER_ERROR: new AppError({
    message: "Internal server error",
    statusCode: 500,
  }),
};

export function handleError(error: unknown, res: Response) {
  console.error("error:", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        timestamp: new Date().toISOString(),
      },
    });
  }
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation error",
        timestamp: new Date().toISOString(),
      },
    });
  }
  // Generic fallback
  return res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      timestamp: new Date().toISOString(),
    },
  });
}
