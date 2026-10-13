import { z } from "zod";

export const createDirectoryLocationSchema = z.object({
  stateKey: z.enum(["gujarat", "mp", "rajasthan"]),
  stateNameEn: z.string().min(2).max(100),
  stateNameHi: z.string().min(2).max(100),
  stateNameGu: z.string().max(100).optional(),
  districtEn: z.string().min(2).max(100),
  districtHi: z.string().min(2).max(100),
  districtGu: z.string().max(100).optional(),
  talukaEn: z.string().min(2).max(100),
  talukaHi: z.string().min(2).max(100),
  talukaGu: z.string().max(100).optional(),
  villageEn: z.string().min(2).max(100),
  villageHi: z.string().min(2).max(100),
  villageGu: z.string().max(100).optional(),
  famousHub: z.string().max(200).optional(),
  isActive: z.boolean().optional(),
});

export const updateDirectoryLocationSchema = createDirectoryLocationSchema.partial();
