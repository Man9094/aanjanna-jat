import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(2).max(200),
  titleHi: z.string().max(200).optional(),
  content: z.string().min(5).max(5000),
  isPublished: z.boolean().default(false),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  titleHi: z.string().max(200).optional(),
  content: z.string().min(5).max(5000).optional(),
  isPublished: z.boolean().optional(),
});
