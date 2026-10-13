import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../config/database";
import { AppError } from "../shared/errors/AppError";

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check cookie first, then Authorization Bearer header
    let token = req.cookies?.admin_session;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Authentication required. Please sign in.", 401);
    }

    // Verify JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET);
    } catch {
      throw new AppError("Invalid or expired session. Please sign in again.", 401);
    }

    if (!decoded || !decoded.id) {
      throw new AppError("Invalid session payload.", 401);
    }

    // Authoritative check against database
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!admin || !admin.isActive) {
      throw new AppError("Admin account not found or deactivated.", 401);
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role as AuthenticatedAdmin["role"],
    };

    next();
  } catch (err) {
    next(err);
  }
}
