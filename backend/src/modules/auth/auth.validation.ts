import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email required").max(255),
  password: z.string().min(1, "Password required").max(128),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128),
});
