import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../shared/utils/response";
import { env } from "../../config/env";
import { clearRateLimit } from "../../middleware/rate-limit";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000; // 8 hours

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { token, admin } = await AuthService.login(email, password);

      // Clear failed rate-limit attempts on success
      clearRateLimit("/api/auth/login", req);

      // Set secure HttpOnly cookie
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: env.isProduction ? "none" : "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });

      return sendSuccess(res, { admin, token }, 200, "Signed in successfully");
    } catch (err) {
      next(err);
    }
  }

  static async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: env.isProduction ? "none" : "lax",
        path: "/",
      });

      return sendSuccess(res, { loggedOut: true }, 200, "Signed out successfully");
    } catch (err) {
      next(err);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AuthService.getMe(req.admin!.id);
      return sendSuccess(res, { admin });
    } catch (err) {
      next(err);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      const result = await AuthService.changePassword(
        req.admin!.id,
        currentPassword,
        newPassword
      );
      return sendSuccess(res, result, 200, "Password changed successfully");
    } catch (err) {
      next(err);
    }
  }
}
