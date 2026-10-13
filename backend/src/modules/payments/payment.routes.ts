import { Router } from "express";
import { PaymentController } from "./payment.controller";
import {
  createOrderSchema,
  verifySchema,
  verifyUpiSchema,
  reviewUpiSchema,
} from "./payment.validation";
import { validateBody } from "../../middleware/validate";
import { rateLimit } from "../../middleware/rate-limit";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public: Create payment order
router.post(
  "/create-order",
  rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 30, message: "Too many payment order requests." }),
  validateBody(createOrderSchema),
  PaymentController.createOrder
);

// Public: Verify Razorpay signature
router.post(
  "/verify",
  validateBody(verifySchema),
  PaymentController.verify
);

// Public: Submit UPI reference (UTR)
router.post(
  "/verify-upi",
  rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 20, message: "Too many UPI submissions." }),
  validateBody(verifyUpiSchema),
  PaymentController.submitUpi
);

// Admin: View UPI submissions
router.get("/upi-submissions", authenticate, authorize("VIEWER"), PaymentController.listUpi);

// Admin: Review UPI submission (ADMIN+)
router.post(
  "/upi-submissions/:id/review",
  authenticate,
  authorize("ADMIN"),
  validateBody(reviewUpiSchema),
  PaymentController.reviewUpi
);

// Webhook endpoint
router.post("/webhook", PaymentController.webhook);

export default router;
