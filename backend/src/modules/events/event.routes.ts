import { Router } from "express";
import { EventController } from "./event.controller";
import { createEventSchema, updateEventSchema } from "./event.validation";
import { validateBody } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public: View published events
router.get("/", EventController.listPublic);

// Admin: View all events
router.get("/admin", authenticate, authorize("VIEWER"), EventController.adminListAll);

// Admin: Create event (EDITOR+)
router.post(
  "/admin",
  authenticate,
  authorize("EDITOR"),
  validateBody(createEventSchema),
  EventController.adminCreate
);

// Admin: Update event (EDITOR+)
router.put(
  "/admin/:id",
  authenticate,
  authorize("EDITOR"),
  validateBody(updateEventSchema),
  EventController.adminUpdate
);

// Admin: Toggle publish (EDITOR+)
router.patch(
  "/admin/:id/publish",
  authenticate,
  authorize("EDITOR"),
  EventController.adminTogglePublish
);

// Admin: Delete event (ADMIN+)
router.delete(
  "/admin/:id",
  authenticate,
  authorize("ADMIN"),
  EventController.adminDelete
);

export default router;
