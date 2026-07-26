import { z } from "zod";

export const settingsSchema = z.object({
  bio: z.string().min(20),
  education: z.string().min(3),
  categories: z.array(z.string()).min(1),
  experience: z.string(),
  hourlyRate: z.number().min(1),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
