import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.service";
import { sendSuccess } from "../../shared/utils/response";

export class AdminController {
  static async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await AdminService.getDashboardStats();
      return sendSuccess(res, stats);
    } catch (err) {
      next(err);
    }
  }

  static async listAdmins(_req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await AdminService.listAdmins();
      return sendSuccess(res, { admins });
    } catch (err) {
      next(err);
    }
  }

  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminService.createAdmin(req.body, req.admin!.id);
      return sendSuccess(res, { admin }, 201, "Admin user created successfully");
    } catch (err) {
      next(err);
    }
  }
}
