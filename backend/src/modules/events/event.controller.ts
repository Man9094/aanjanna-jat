import { Request, Response, NextFunction } from "express";
import { EventService } from "./event.service";
import { sendSuccess } from "../../shared/utils/response";

export class EventController {
  static async listPublic(_req: Request, res: Response, next: NextFunction) {
    try {
      const events = await EventService.listPublished();
      return sendSuccess(res, { events, count: events.length });
    } catch (err) {
      next(err);
    }
  }

  static async adminListAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const events = await EventService.adminListAll();
      return sendSuccess(res, { events, count: events.length });
    } catch (err) {
      next(err);
    }
  }

  static async adminCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await EventService.createEvent(req.body, req.admin!.id);
      return sendSuccess(res, { event }, 201, "Event created successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.updateEvent(id, req.body, req.admin!.id);
      return sendSuccess(res, { event }, 200, "Event updated successfully");
    } catch (err) {
      next(err);
    }
  }

  static async adminTogglePublish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.togglePublish(id, req.admin!.id);
      return sendSuccess(
        res,
        { event },
        200,
        `Event ${event.isPublished ? "published" : "unpublished"} successfully`
      );
    } catch (err) {
      next(err);
    }
  }

  static async adminDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await EventService.deleteEvent(id, req.admin!.id);
      return sendSuccess(res, result, 200, "Event deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}
