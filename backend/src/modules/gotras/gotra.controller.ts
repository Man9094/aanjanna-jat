import { Request, Response, NextFunction } from "express";
import { GotraService } from "./gotra.service";
import { sendSuccess } from "../../shared/utils/response";

export class GotraController {
  static async listPublic(_req: Request, res: Response, next: NextFunction) {
    try {
      const gotras = await GotraService.getVerifiedGotras();
      return sendSuccess(res, { gotras, count: gotras.length });
    } catch (err) {
      next(err);
    }
  }

  static async submitPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const submission = await GotraService.submitGotra(req.body);
      return sendSuccess(
        res,
        { submission },
        201,
        "Gotra submission received for Mahasabha verification"
      );
    } catch (err) {
      next(err);
    }
  }

  static async adminList(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.search ? String(req.query.search) : undefined;
      const gotras = await GotraService.adminListGotras(search);
      return sendSuccess(res, { gotras, count: gotras.length });
    } catch (err) {
      next(err);
    }
  }

  static async adminCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const gotra = await GotraService.createGotra(req.body, req.admin!.id);
      return sendSuccess(res, { gotra }, 201, "Gotra created successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const gotra = await GotraService.updateGotra(id, req.body, req.admin!.id);
      return sendSuccess(res, { gotra }, 200, "Gotra updated successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await GotraService.deleteGotra(id, req.admin!.id);
      return sendSuccess(res, result, 200, "Gotra deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminListSubmissions(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status ? String(req.query.status) : undefined;
      const submissions = await GotraService.listSubmissions(status);
      return sendSuccess(res, { submissions, count: submissions.length });
    } catch (err) {
      next(err);
    }
  }

  static async adminApproveSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { note } = req.body || {};
      const submission = await GotraService.approveSubmission(
        id,
        req.admin!.id,
        req.admin!.name,
        note
      );
      return sendSuccess(res, { submission }, 200, "Gotra submission approved and added to directory");
    } catch (err) {
      next(err);
    }
  }

  static async adminRejectSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { note } = req.body || {};
      const submission = await GotraService.rejectSubmission(
        id,
        req.admin!.id,
        req.admin!.name,
        note
      );
      return sendSuccess(res, { submission }, 200, "Gotra submission rejected");
    } catch (err) {
      next(err);
    }
  }
}
