import { z } from "zod";

export const createGotraSchema = z.object({
  id: z
    .string()
    .min(2, "Gotra ID must be at least 2 characters")
    .max(50)
    .regex(/^[a-z0-9_-]+$/, "ID must be lowercase alphanumeric with dashes/underscores"),
  en: z.string().min(2, "English name is required").max(100),
  hi: z.string().min(2, "Hindi name is required").max(100),
  gu: z.string().max(100).optional(),
});

export const updateGotraSchema = z.object({
  en: z.string().min(2).max(100).optional(),
  hi: z.string().min(2).max(100).optional(),
  gu: z.string().max(100).optional(),
});

export const submitGotraSchema = z.object({
  nameEn: z.string().min(2, "Gotra name in English is required").max(100),
  nameHi: z.string().max(100).optional(),
  nameGu: z.string().max(100).optional(),
  submittedBy: z.string().max(100).optional(),
  contact: z.string().max(20).optional(),
  village: z.string().max(100).optional(),
});

export const reviewSubmissionSchema = z.object({
  note: z.string().max(500).optional(),
});
