import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";
import { StudentTutor } from "@/types/tutor-student.type";

export function getStudentTutors(
    bookings: Booking[]
): StudentTutor[] {
    const map = new Map<string, Booking[]>();

    for (const booking of bookings) {
        const key = booking.tutor.id;

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key)!.push(booking);
    }

    return Array.from(map.values()).map((tutorBookings) => {
        const tutor = tutorBookings[0].tutor;

        const completedSessions = tutorBookings.filter(
            (b) => b.status === BOOKING_STATUS.COMPLETED
        ).length;

        const upcomingSessions = tutorBookings.filter(
            (b) =>
                b.status === BOOKING_STATUS.CONFIRMED ||
                b.status === BOOKING_STATUS.PENDING
        ).length;

        const cancelledSessions = tutorBookings.filter(
            (b) => b.status === BOOKING_STATUS.CANCELLED
        ).length;

        const ratings = tutorBookings
            .filter((b) => b.review)
            .map((b) => b.review!.rating);

        const sortedBookings = [...tutorBookings].sort(
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
        );

        return {
            tutor,

            bookings: tutorBookings,

            totalSessions: tutorBookings.length,

            completedSessions,

            upcomingSessions,

            cancelledSessions,

            firstBooking: sortedBookings[0],

            latestBooking:
                sortedBookings[sortedBookings.length - 1],

            averageRating:
                ratings.length === 0
                    ? undefined
                    : ratings.reduce((a, b) => a + b, 0) /
                      ratings.length,
        };
    });
}