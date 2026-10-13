import { Router } from "express";
import { GotraController } from "./gotra.controller";
import {
  createGotraSchema,
  updateGotraSchema,
  submitGotraSchema,
  reviewSubmissionSchema,
} from "./gotra.validation";
import { validateBody } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public: List verified gotras
router.get("/", GotraController.listPublic);

// Public: Submit a gotra for verification
router.post("/submit", validateBody(submitGotraSchema), GotraController.submitPublic);

// Admin: List verified gotras with search
router.get("/admin/all", authenticate, authorize("VIEWER"), GotraController.adminList);

// Admin: Submissions review
router.get(
  "/admin/submissions",
  authenticate,
  authorize("VIEWER"),
  GotraController.adminListSubmissions
);

router.post(
  "/admin/submissions/:id/approve",
  authenticate,
  authorize("ADMIN"),
  validateBody(reviewSubmissionSchema),
  GotraController.adminApproveSubmission
);

router.post(
  "/admin/submissions/:id/reject",
  authenticate,
  authorize("ADMIN"),
  validateBody(reviewSubmissionSchema),
  GotraController.adminRejectSubmission
);

// Admin: Create/Edit/Delete verified gotras
router.post(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  validateBody(createGotraSchema),
  GotraController.adminCreate
);

router.put(
  "/admin/:id",
  authenticate,
  authorize("ADMIN"),
  validateBody(updateGotraSchema),
  GotraController.adminUpdate
);

router.delete(
  "/admin/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  GotraController.adminDelete
);

export default router;
