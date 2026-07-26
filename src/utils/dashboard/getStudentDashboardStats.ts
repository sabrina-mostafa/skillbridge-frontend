
import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";


export function getStudentDashboardStats(bookings: Booking[]) {
    const uniqueTutors = new Set(
        bookings.map((booking) => booking.tutorId)
    );

    const upcomingSessions = bookings.filter(
        (booking) =>
            new Date(booking.startTime) > new Date() &&
            booking.status === BOOKING_STATUS.CONFIRMED
    ).length;

    const completedSessions = bookings.filter(
        (booking) =>
            booking.status === BOOKING_STATUS.COMPLETED
    ).length;

    // Replace this once Assignment module is built
    const pendingAssignments = 0;

    return {
        tutors: uniqueTutors.size,
        upcomingSessions,
        completedSessions,
        pendingAssignments,
    };
}