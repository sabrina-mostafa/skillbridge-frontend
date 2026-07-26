import { AvailabilityStatus } from "@/constants/availability/availabilityStatus";

export const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export type DayOfWeek = (typeof DAYS)[number];

export type Availability = {
  id: string;
  tutorId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateAvailabilityPayload = {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  slotDuration: number;
};

export type AvailableDate = {
  date: string;
  status: AvailabilityStatus;
  availableSlots: number;
};

export type AvailableDatesResponse = {
  tutorId: string;
  range: {
    from: string;
    to: string;
  };
  dates: AvailableDate[];
};

export type TimeSlot = {
  start: string;
  end: string;
};

export type AvailableSlotsResponse = {
  tutorId: string;
  date: string;
  totalSlots: number;
  slots: TimeSlot[];
};