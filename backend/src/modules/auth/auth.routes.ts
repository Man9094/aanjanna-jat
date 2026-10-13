import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginSchema, updatePasswordSchema } from "./auth.validation";
import { validateBody } from "../../middleware/validate";
import { rateLimit } from "../../middleware/rate-limit";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

router.post(
  "/login",
  rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 5, message: "Too many login attempts. Please try again after 15 minutes." }),
  validateBody(loginSchema),
  AuthController.login
);

router.post("/logout", AuthController.logout);

router.get("/me", authenticate, AuthController.me);

router.post(
  "/change-password",
  authenticate,
  validateBody(updatePasswordSchema),
  AuthController.changePassword
);

export default router;
