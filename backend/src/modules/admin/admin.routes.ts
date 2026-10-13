import { Router } from "express";
import { AdminController } from "./admin.controller";
import { createAdminSchema } from "./admin.validation";
import { validateBody } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Dashboard stats: any authenticated admin role can view
router.get("/stats", authenticate, authorize("VIEWER"), AdminController.getStats);

// Admin account management: SUPER_ADMIN only
router.get("/users", authenticate, authorize("SUPER_ADMIN"), AdminController.listAdmins);
router.post(
  "/users",
  authenticate,
  authorize("SUPER_ADMIN"),
  validateBody(createAdminSchema),
  AdminController.createAdmin
);

export default router;
