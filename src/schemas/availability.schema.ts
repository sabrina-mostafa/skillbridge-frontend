import { z } from "zod";

import { DAYS } from "@/types/availability.type";

export const availabilitySchema = z.object({
  dayOfWeek: z.enum(DAYS),
  startTime: z.string(),
  endTime: z.string(),
  slotDuration: z.number().min(30).multipleOf(30),
});
