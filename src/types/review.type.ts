import { Booking } from "./booking.types";
import { Student } from "./student.type";
import { Tutor } from "./tutor.types";

export interface Review {
    id: string;
    rating: number;
    comment: string;

    bookingId: string;
    tutorId: string;
    studentId: string;

    createdAt: string;
    updatedAt: string;

    student: Student;
    tutor: Tutor;
    booking: Booking
}

export type ReviewResponse = {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: Review[];
};

export type GetAllReviewsQuery = {
    searchTerm?: string;
    minRating?: string;
    page?: string;
    limit?: string;
    skip?: string;
    sortBy?: "createdAt" | "rating";
    sortOrder?: "asc" | "desc";
};