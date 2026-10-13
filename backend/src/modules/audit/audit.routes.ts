import { Router } from "express";
import { AuditController } from "./audit.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Restricted to SUPER_ADMIN only
router.get("/", authenticate, authorize("SUPER_ADMIN"), AuditController.list);

export default router;
