import { BookingStatus } from "@/constants/booking/BookingStatus";
import { CategoryBase } from "./category.type";
import { User } from "./user.type";

export interface Student {
  id: string;
  bio: string;
  education: string;

  userId: string;

  categories: CategoryBase[];

  user: User;

  createdAt: string;
  updatedAt: string;
}

export interface StudentCategory {
  studentId: string;
  categoryId: string;
  student: Student;
}

export type StudentQuery = {
  searchTerm?: string;
  status?: BookingStatus;
  sortBy?: "latestBooking" | "name" | "totalBookings";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;
};

export type StudentSummary = {
  total: number;
  active: number;
  returning: number;
  sessions: number;
};