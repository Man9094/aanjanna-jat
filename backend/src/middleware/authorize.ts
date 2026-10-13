import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError";
import { AuthenticatedAdmin } from "./authenticate";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

const ROLE_HIERARCHY: Record<AdminRole, number> = {
  VIEWER: 1,
  EDITOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

export function authorize(minRole: AdminRole = "VIEWER") {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.admin) {
      return next(new AppError("Authentication required.", 401));
    }

    const userLevel = ROLE_HIERARCHY[req.admin.role] ?? 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] ?? 0;

    if (userLevel < requiredLevel) {
      return next(
        new AppError(
          `Insufficient permissions. Requires at least ${minRole} role.`,
          403
        )
      );
    }

    next();
  };
}
