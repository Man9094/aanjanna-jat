import { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "./announcement.service";
import { sendSuccess } from "../../shared/utils/response";

export class AnnouncementController {
  static async listPublished(_req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await AnnouncementService.listPublished();
      return sendSuccess(res, { announcements });
    } catch (err) {
      next(err);
    }
  }

  static async listAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await AnnouncementService.listAll();
      return sendSuccess(res, { announcements });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const announcement = await AnnouncementService.create(req.body, req.admin!.id);
      return sendSuccess(res, { announcement }, 201, "Announcement created successfully");
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const announcement = await AnnouncementService.update(req.params.id, req.body, req.admin!.id);
      return sendSuccess(res, { announcement }, 200, "Announcement updated successfully");
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AnnouncementService.delete(req.params.id, req.admin!.id);
      return sendSuccess(res, result, 200, "Announcement deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}
