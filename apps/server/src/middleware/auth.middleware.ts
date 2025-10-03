import { Errors, handleError } from "@/lib/errors";
import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/auth";
import type { Role as UserRole } from "@repo/common";

export const requireAuth = (roles: UserRole[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
        throw Errors.UNAUTHORIZED;
      }

      const token = header.split(" ")[1];
      const { userId, role } = verifyToken(token);

      const userRole = role as UserRole;
      if (!roles.includes(userRole)) {
        throw Errors.UNAUTHORIZED;
      }
      req.userId = userId;
      next();
    } catch (error) {
      handleError(error, res);
    }
  };
};
