import { Router } from "express";
import { DirectoryController } from "./directory.controller";
import {
  createDirectoryLocationSchema,
  updateDirectoryLocationSchema,
} from "./directory.validation";
import { validateBody } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public: view active villages
router.get("/villages", DirectoryController.listPublic);

// Admin: list with search and filters
router.get("/admin", authenticate, authorize("VIEWER"), DirectoryController.adminList);

// Admin: create location
router.post(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  validateBody(createDirectoryLocationSchema),
  DirectoryController.adminCreate
);

// Admin: update location
router.put(
  "/admin/:id",
  authenticate,
  authorize("ADMIN"),
  validateBody(updateDirectoryLocationSchema),
  DirectoryController.adminUpdate
);

// Admin: delete location
router.delete(
  "/admin/:id",
  authenticate,
  authorize("ADMIN"),
  DirectoryController.adminDelete
);

export default router;
