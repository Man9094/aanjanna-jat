import { Router } from "express";
import { MemberController } from "./member.controller";
import { createMemberSchema, reviewMemberSchema } from "./member.validation";
import { validateBody } from "../../middleware/validate";
import { rateLimit } from "../../middleware/rate-limit";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public registration endpoint
router.post(
  "/",
  rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 20, message: "Too many membership submissions. Please try again later." }),
  validateBody(createMemberSchema),
  MemberController.register
);

// Public verification for card QR scan
router.get("/verify/:memberId", MemberController.verifyCard);

// Protected Admin Endpoints
router.get("/", authenticate, authorize("VIEWER"), MemberController.list);
router.get("/:id", authenticate, authorize("VIEWER"), MemberController.getById);

router.post(
  "/:id/approve",
  authenticate,
  authorize("ADMIN"),
  validateBody(reviewMemberSchema),
  MemberController.approve
);

router.post(
  "/:id/reject",
  authenticate,
  authorize("ADMIN"),
  validateBody(reviewMemberSchema),
  MemberController.reject
);

export default router;
