import { Request, Response, NextFunction } from "express";
import { AuditService } from "./audit.service";
import { sendSuccess } from "../../shared/utils/response";

export class AuditController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 100;
      const result = await AuditService.getLogs(limit, page);
      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }
}
