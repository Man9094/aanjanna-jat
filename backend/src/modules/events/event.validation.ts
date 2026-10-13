import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  titleHi: z.string().max(200).optional(),
  description: z.string().min(5, "Description must be at least 5 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  location: z.string().min(2, "Location is required").max(200),
  category: z
    .enum(["conference", "cultural", "sports", "seminar", "meeting", "social"])
    .default("meeting"),
  image: z.string().optional(),
  isUpcoming: z.boolean().default(true),
  isPublished: z.boolean().default(true),
  registrationLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const updateEventSchema = createEventSchema.partial();
