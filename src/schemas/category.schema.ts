import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name is required"),

  shortDesc: z.string(),

  description: z.string(),

  thumbnail: z
    .string()
    .url("Invalid image URL")
    .or(z.literal("")),

  parentId: z.string().nullable(),

  learningOutcomes: z.array(z.string()),

  isFeatured: z.boolean(),
});

export type CategorySchemaValues = z.infer<typeof categorySchema>;