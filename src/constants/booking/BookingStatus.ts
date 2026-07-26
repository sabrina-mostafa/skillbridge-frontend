export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  DECLINED: "DECLINED",
  CANCELLED: "CANCELLED",
} as const;

export type BookingStatus =
  typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];


  

export type TutorBookingStatus = Extract<
  BookingStatus,
  "CONFIRMED" | "DECLINED" | "COMPLETED"
>;

export type StudentBookingStatus = Extract<
  BookingStatus,
  "CANCELLED" | "COMPLETED"
>;