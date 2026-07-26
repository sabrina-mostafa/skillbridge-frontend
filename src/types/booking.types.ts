import { Tutor } from '@/types/tutor.types';
import { Student } from './student.type';
import { BookingStatus } from '@/constants/booking/BookingStatus';
import { PaymentStatus } from '@/constants/booking/PaymentStatus';
import { TimeSlot } from "@/types/availability.type";
import { Review } from './review.type';
import { Category } from './category.type';


export type Booking = {
  id: string;
  tutorId: string;
  studentId: string;
  categoryId: string;
  
  date: string;
  startTime: string;
  endTime: string;

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  meetingLink?: string | null;
  meetingType?: string | null;

  createdAt: string;
  updatedAt: string;

  tutor: Tutor;
  student: Student;
  category: Category;
  review?: Review;
};

export type BookingResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Booking[];
};

export enum BookingStep {
  DATE = "DATE",
  SLOT = "SLOT",
  REVIEW = "REVIEW",
  SUCCESS = "SUCCESS",
}

export type BookingState = {
  step: BookingStep;
  selectedDate?: string;
  selectedSlot?: TimeSlot;
  bookingId?: string;
};