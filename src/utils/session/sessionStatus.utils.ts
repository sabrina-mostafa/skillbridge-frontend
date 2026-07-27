import { SESSION_STATUS, SessionStatus } from "@/constants/booking/BookingSessionStatus";
import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";


export const getSessionStatus = (
  booking: Booking
): SessionStatus => {
  if (booking.status === SESSION_STATUS.CANCELLED) {
    return SESSION_STATUS.CANCELLED;
  }

  if (booking.status === SESSION_STATUS.COMPLETED) {
    return SESSION_STATUS.COMPLETED;
  }

  const now = new Date();
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  if (booking.status === BOOKING_STATUS.CONFIRMED && (now < start)) {
    return SESSION_STATUS.UPCOMING;
  }

  if (booking.status !== BOOKING_STATUS.CONFIRMED && (now < start)) {
    return SESSION_STATUS.PENDING_CONFIRMATION;
  }

  if (booking.status === BOOKING_STATUS.CONFIRMED &&
    now >= start && now <= end) {
    return SESSION_STATUS.ONGOING;
  }

  return SESSION_STATUS.MISSED;
};

export const getSessionDuration = (
  booking: Booking
): number => {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  return Math.round(
    (end.getTime() - start.getTime()) / 1000 / 60
  );
};

export const formatSessionDate = (
  booking: Booking
) => {
  return new Date(booking.startTime).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};

export const formatSessionTime = (
  booking: Booking
) => {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  return `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })}`;
};

export const canJoinSession = (
  booking: Booking
) => {
  if (!booking.meetingLink) return false;

  const status = getSessionStatus(booking);

  return (
    status === SESSION_STATUS.ONGOING ||
    status === SESSION_STATUS.UPCOMING
  );
};

export const getMeetingTypeLabel = (
  meetingType?: string | null
) => {
  switch (meetingType) {
    case "GOOGLE_MEET":
      return "Google Meet";

    case "ZOOM":
      return "Zoom";

    case "MICROSOFT_TEAMS":
      return "Microsoft Teams";

    default:
      return "Unknown";
  }
};