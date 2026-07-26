import { Booking } from "./booking.types";
import { Category } from "./category.type";
import { PublicContactMessages } from "./public-contact-form.type";
import { Review } from "./review.type";
import { Student } from "./student.type";
import { Tutor } from "./tutor.types";
import { User } from "./user.type";


export const REPORT_TYPES = [
    "overview",
    "users",
    "bookings",
    "reviews",
    "categories",
    "contacts",
] as const;

export type ReportType = (typeof REPORT_TYPES)[number];

export type ReportFormat =
    | "json"
    | "csv"
    | "xlsx"
    | "pdf";

export type GetReportQuery = {
    type: ReportType;
    from?: string;
    to?: string;
    format?: ReportFormat;
};

/* ---------------- Overview ---------------- */
export type OverviewReport = {
    type: "overview";
    generatedAt: string;
    data: {
        totalUsers: number;
        totalTutors: number;
        totalStudents: number;
        totalBookings: number;
        completedBookings: number;
        totalReviews: number;
        averageRating: number;
        totalContacts: number;
    };
};

/* ---------------- Users ---------------- */
export type UsersReport = User & {
    studentProfile: Student | null;
    tutorProfile: Tutor | null;
};

/* ---------------- Bookings ---------------- */
export type BookingsReport = Booking[];

/* ---------------- Reviews ---------------- */
export type ReviewsReport = Review[];

/* ---------------- Categories ---------------- */
export type CategoriesReport = Category[];

/* ---------------- Contacts ---------------- */
export type ContactsReport = PublicContactMessages[];


export type UsersReportResponse = {
    type: "users";
    generatedAt: string;
    data: UsersReport[];
};

export type BookingsReportResponse = {
    type: "bookings";
    generatedAt: string;
    data: BookingsReport;
};

export type ReviewsReportResponse = {
    type: "reviews";
    generatedAt: string;
    data: ReviewsReport;
};

export type CategoriesReportResponse = {
    type: "categories";
    generatedAt: string;
    data: CategoriesReport;
};

export type ContactsReportResponse = {
    type: "contacts";
    generatedAt: string;
    data: ContactsReport;
};

/* ---------------- Generic ---------------- */
export type ReportResponse =
    | OverviewReport
    | UsersReportResponse
    | BookingsReportResponse
    | ReviewsReportResponse
    | CategoriesReportResponse
    | ContactsReportResponse;

    
/* ---------------- Generate ---------------- */
export type GeneratedReportResponse = {
    type: ReportType;
    from: string | null;
    to: string | null;
    generatedAt: string;
    data: unknown;
};