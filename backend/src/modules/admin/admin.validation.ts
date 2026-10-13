import { z } from "zod";

export const createAdminSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(128),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"]).default("ADMIN"),
});

export const updateAdminStatusSchema = z.object({
  isActive: z.boolean(),
});
