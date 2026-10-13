import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class AuthService {
  static async login(emailInput: string, passwordInput: string) {
    const email = emailInput.trim().toLowerCase();

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // Constant-time check pattern to mitigate timing attacks
    if (!admin || !admin.isActive) {
      // Dummy compare to avoid timing leak
      await bcrypt.compare(
        passwordInput,
        "$2a$12$e8x/yYd8e6zZ66pDq0tP4.908uPwqM/V64gOa16Z6hA9hY5E9w1l2"
      );
      throw new AppError("Invalid email or password.", 401);
    }

    const isMatch = await bcrypt.compare(passwordInput, admin.passwordHash);

    if (!isMatch) {
      await AuditService.log({
        action: "ADMIN_LOGIN_FAILURE",
        targetType: "ADMIN",
        targetId: admin.id,
        adminId: admin.id,
        metadata: { reason: "invalid_password" },
      }).catch(() => {});

      throw new AppError("Invalid email or password.", 401);
    }

    // Login successful
    await AuditService.log({
      action: "ADMIN_LOGIN_SUCCESS",
      targetType: "ADMIN",
      targetId: admin.id,
      adminId: admin.id,
    }).catch(() => {});

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }

  static async getMe(adminId: string) {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!admin) {
      throw new AppError("Admin not found.", 404);
    }

    return admin;
  }

  static async changePassword(adminId: string, currentPass: string, newPass: string) {
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new AppError("Admin not found.", 404);
    }

    const isMatch = await bcrypt.compare(currentPass, admin.passwordHash);
    if (!isMatch) {
      throw new AppError("Current password is incorrect.", 400);
    }

    const newHash = await bcrypt.hash(newPass, 12);
    await prisma.admin.update({
      where: { id: adminId },
      data: { passwordHash: newHash },
    });

    await AuditService.log({
      action: "ADMIN_PASSWORD_CHANGED",
      targetType: "ADMIN",
      targetId: adminId,
      adminId,
    });

    return { success: true };
  }
}
