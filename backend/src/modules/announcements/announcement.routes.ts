import { Router } from "express";
import { AnnouncementController } from "./announcement.controller";
import { createAnnouncementSchema, updateAnnouncementSchema } from "./announcement.validation";
import { validateBody } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public: view published announcements
router.get("/", AnnouncementController.listPublished);

// Admin: view all announcements
router.get("/admin", authenticate, authorize("VIEWER"), AnnouncementController.listAll);

// Admin: create announcement (EDITOR+)
router.post(
  "/",
  authenticate,
  authorize("EDITOR"),
  validateBody(createAnnouncementSchema),
  AnnouncementController.create
);

// Admin: update announcement (EDITOR+)
router.patch(
  "/:id",
  authenticate,
  authorize("EDITOR"),
  validateBody(updateAnnouncementSchema),
  AnnouncementController.update
);

// Admin: delete announcement (ADMIN+)
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  AnnouncementController.delete
);

export default router;
