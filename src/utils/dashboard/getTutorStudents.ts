import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";
import { TutorStudent } from "@/types/tutor-student.type";

export function getTutorStudents(
    bookings: Booking[]
): TutorStudent[] {
    const map = new Map<string, Booking[]>();

    for (const booking of bookings) {
        const key = booking.student.id;

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(booking);
    }

    return Array.from(map.values()).map((studentBookings) => {
        const student = studentBookings[0].student;

        const completedSessions = studentBookings.filter(
            (b) => b.status === BOOKING_STATUS.COMPLETED
        ).length;

        const upcomingSessions = studentBookings.filter(
            (b) =>
                b.status === BOOKING_STATUS.CONFIRMED ||
                b.status === BOOKING_STATUS.PENDING
        ).length;

        const cancelledSessions = studentBookings.filter(
            (b) => b.status === BOOKING_STATUS.CANCELLED
        ).length;

        const ratings = studentBookings
            .filter((b) => b.review)
            .map((b) => b.review!.rating);

        return {
            student,

            bookings: studentBookings,

            totalSessions: studentBookings.length,

            completedSessions,

            upcomingSessions,

            cancelledSessions,

            firstSession: studentBookings
                .map((b) => b.date)
                .sort()[0],

            lastSession: studentBookings
                .map((b) => b.date)
                .sort()
                .reverse()[0],

            averageRating:
                ratings.length === 0
                    ? undefined
                    : ratings.reduce((a, b) => a + b, 0) /
                    ratings.length,
        };
    });
}