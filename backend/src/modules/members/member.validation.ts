import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(2, "Full name required").max(100),
  fatherOrSpouse: z.string().max(100).optional(),
  gotra: z.string().min(2, "Gotra required").max(50),
  village: z.string().min(2, "Village required").max(100),
  district: z.string().min(2, "District required").max(100),
  state: z.string().min(2, "State required").max(100),
  occupation: z.string().max(100).optional(),
  bloodGroup: z.string().max(10).optional(),
  contact: z
    .string()
    .min(10, "10-digit mobile number required")
    .max(15)
    .regex(/^[0-9+ -]+$/, "Invalid contact number format"),
  photoUrl: z.string().url("Invalid photo URL").optional().or(z.literal("")),
});

export const reviewMemberSchema = z.object({
  note: z.string().max(500, "Note cannot exceed 500 characters").optional(),
});
