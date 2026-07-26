import { Tutor } from './tutor.types';
import { Booking } from "./booking.types";
import { Student } from "./student.type";


export type TutorStudent = {
    student: Student;
    bookings: Booking[];

    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    cancelledSessions: number;

    firstBooking?: Booking;
    latestBooking?: Booking;

    averageRating?: number;
};

export type StudentTutor = {
    tutor: Tutor;
    bookings: Booking[];

    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    cancelledSessions: number;

    firstBooking?: Booking;
    latestBooking?: Booking;

    averageRating?: number;
};