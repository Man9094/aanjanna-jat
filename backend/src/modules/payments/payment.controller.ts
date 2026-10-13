import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";
import { sendSuccess } from "../../shared/utils/response";

export class PaymentController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await PaymentService.createOrder(req.body);
      return res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PaymentService.verifyPayment(req.body);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async submitUpi(req: Request, res: Response, next: NextFunction) {
    try {
      const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown";
      const result = await PaymentService.submitUpi(req.body, ip);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async listUpi(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PaymentService.listUpiSubmissions();
      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async reviewUpi(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, note } = req.body;
      const result = await PaymentService.reviewUpiSubmission(
        req.params.id,
        status,
        req.admin!.id,
        note
      );
      return sendSuccess(res, { submission: result }, 200, `UPI submission marked as ${status}`);
    } catch (err) {
      next(err);
    }
  }

  static async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers["x-razorpay-signature"] as string;
      const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      const result = PaymentService.verifyWebhook(rawBody, signature);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
