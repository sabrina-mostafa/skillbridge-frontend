import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";

export function getTutorDashboardStats(bookings: Booking[]) {
    const uniqueStudents = new Set(
        bookings.map((booking) => booking.studentId)
    );

    const upcomingSessions = bookings.filter(
        (booking) =>
            booking.status === BOOKING_STATUS.CONFIRMED &&
            new Date(booking.startTime) > new Date()
    ).length;

    const completedSessions = bookings.filter(
        (booking) =>
            booking.status === BOOKING_STATUS.COMPLETED
    );

    const totalReviews = completedSessions.filter(
        (booking) => booking.review
    ).length;

    const averageRating =
        totalReviews === 0
            ? 0
            : completedSessions
                .filter((booking) => booking.review)
                .reduce(
                    (sum, booking) => sum + (booking.review?.rating ?? 0),
                    0
                ) / totalReviews;

    // Replace with Payment module later
    const totalEarnings = 0;

    return {
        students: uniqueStudents.size,
        upcomingSessions,
        completedSessions: completedSessions.length,
        averageRating,
        totalReviews,
        totalEarnings,
    };
}