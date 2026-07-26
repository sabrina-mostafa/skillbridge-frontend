import { Availability } from "./availability.type";
import { Booking } from "./booking.types";
import { CategoryBase } from "./category.type";
import { Review } from "./review.type";
import { User } from "./user.type";

export interface Tutor {
  id: string;
  userId: string;
  bio: string;
  education: string;
  hourlyRate: string;
  experience: string;
  avgRating: number;
  totalReviews: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;

  user: User

  availability: Availability[];

  bookingsAsTutor: Booking[];

  categories: CategoryBase[];

  tutorReviews: Review[];

  _count: {
    bookingsAsTutor: number;
    tutorReviews: number;
    availability: number;
    categories: number;
  };
}

export interface TutorsResponse {
  data: Tutor[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TutorCategory {
  tutorId: string;
  categoryId: string;
  tutor: Tutor;
}

