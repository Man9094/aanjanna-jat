import { Request, Response, NextFunction } from "express";
import { MemberService } from "./member.service";
import { sendSuccess } from "../../shared/utils/response";

export class MemberController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MemberService.registerMember(req.body);
      return sendSuccess(res, result, 201, "Membership application submitted successfully");
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, search, page, limit } = req.query;
      const result = await MemberService.listMembers({
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await MemberService.getMemberById(req.params.id);
      return sendSuccess(res, { member });
    } catch (err) {
      next(err);
    }
  }

  static async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await MemberService.approveMember(
        req.params.id,
        req.admin!.id,
        req.body?.note
      );
      return sendSuccess(res, { member }, 200, "Member approved successfully");
    } catch (err) {
      next(err);
    }
  }

  static async reject(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await MemberService.rejectMember(
        req.params.id,
        req.admin!.id,
        req.body?.note
      );
      return sendSuccess(res, { member }, 200, "Member rejected successfully");
    } catch (err) {
      next(err);
    }
  }

  static async verifyCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await MemberService.verifyOfficialCard(req.params.memberId);
      return sendSuccess(res, { verified: true, card });
    } catch (err) {
      next(err);
    }
  }
}
