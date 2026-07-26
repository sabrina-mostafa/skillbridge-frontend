import { Booking } from "@/types/booking.types";
import { getSessionStatus } from "./sessionStatus.utils";
import { SESSION_STATUS } from "@/constants/booking/BookingSessionStatus";


export const isTodaySession = (
  booking: Booking
) => {
  const today = new Date();
  const sessionDate = new Date(booking.startTime);

  return (
    today.getFullYear() === sessionDate.getFullYear() &&
    today.getMonth() === sessionDate.getMonth() &&
    today.getDate() === sessionDate.getDate()
  );
};

export const getSessionSummary = (
  bookings: Booking[]
) => {
  let upcoming = 0;
  let ongoing = 0;
  let completed = 0;
  let today = 0;

  bookings.forEach((booking) => {
    const status = getSessionStatus(booking);

    if (status === SESSION_STATUS.UPCOMING) {
      upcoming++;
    }

    if (status === SESSION_STATUS.ONGOING) {
      ongoing++;
    }

    if (status === SESSION_STATUS.COMPLETED) {
      completed++;
    }

    if (isTodaySession(booking)) {
      today++;
    }
  });

  return {
    upcoming,
    ongoing,
    completed,
    today,
  };
};