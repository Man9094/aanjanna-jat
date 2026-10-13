import { Request, Response, NextFunction } from "express";
import { DirectoryService } from "./directory.service";
import { sendSuccess } from "../../shared/utils/response";

export class DirectoryController {
  static async listPublic(_req: Request, res: Response, next: NextFunction) {
    try {
      const villages = await DirectoryService.getActiveVillages();
      return sendSuccess(res, { villages, count: villages.length });
    } catch (err) {
      next(err);
    }
  }

  static async adminList(req: Request, res: Response, next: NextFunction) {
    try {
      const stateKey = req.query.stateKey ? String(req.query.stateKey) : undefined;
      const search = req.query.search ? String(req.query.search) : undefined;
      const page = req.query.page ? parseInt(String(req.query.page), 10) : 1;
      const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 50;

      const result = await DirectoryService.adminList({
        stateKey,
        search,
        page,
        limit,
      });

      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async adminCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await DirectoryService.createLocation(req.body, req.admin!.id);
      return sendSuccess(res, { location }, 201, "Directory entry created successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const location = await DirectoryService.updateLocation(id, req.body, req.admin!.id);
      return sendSuccess(res, { location }, 200, "Directory entry updated successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await DirectoryService.deleteLocation(id, req.admin!.id);
      return sendSuccess(res, result, 200, "Directory entry deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}
