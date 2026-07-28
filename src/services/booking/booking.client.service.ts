import { SessionStatus } from "@/constants/booking/BookingSessionStatus";
import { BookingStatus, StudentBookingStatus, TutorBookingStatus } from "@/constants/booking/BookingStatus";
// import { env } from "@/env";
import { AvailableDatesResponse, AvailableSlotsResponse } from "@/types/availability.type";
import { BookingResponse } from "@/types/booking.types";


// const API_URL = env.NEXT_PUBLIC_API_URL;
const API_URL = "/api";

export type BookingFilters = {
    page?: number;
    limit?: number;
    status?: string;
    sessionStatus?: SessionStatus;
    meetingType?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: "createdAt" | "date" | "status" | "startTime" | "endTime" | "meetingType";
    sortOrder?: "asc" | "desc";
};

export type GetMineResponse = {
    data: BookingResponse | null;
    error: string | null;
};

export type CreateBookingPayload = {
    tutorId: string;
    categoryId: string;
    date: string;
    startTime: string;
    endTime: string;
};


export const bookingClientService = {

    getMine: async (filters?: BookingFilters): Promise<GetMineResponse> => {
        try {
            const params = new URLSearchParams();

            if (filters?.page)
                params.append("page", String(filters.page));

            if (filters?.limit)
                params.append("limit", String(filters.limit));

            if (filters?.status)
                params.append("status", filters.status);

            if (filters?.sessionStatus)
                params.append("sessionStatus", filters.sessionStatus);

            if (filters?.meetingType)
                params.append("meetingType", filters.meetingType);

            if (filters?.startDate)
                params.append("startDate", filters.startDate);

            if (filters?.endDate)
                params.append("endDate", filters.endDate);

            if (filters?.sortBy)
                params.append("sortBy", filters.sortBy);

            if (filters?.sortOrder)
                params.append("sortOrder", filters.sortOrder);

            const res = await fetch(`${API_URL}/booking/me?${params.toString()}`, {
                method: "GET",
                credentials: "include",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: result.message || "Failed to fetch bookings",
                };
            }

            return {
                data: result.data as BookingResponse,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getAvailableDates: async (tutorId: string) => {
        try {
            const res = await fetch(
                `${API_URL}/tutors/${tutorId}/available-dates`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ?? "Failed to fetch available dates"
                );
            }
            return {
                data: data.data as AvailableDatesResponse,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    getAvailableSlots: async (
        tutorId: string,
        date: string
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/tutors/${tutorId}/available-dates/slots?date=${date}`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to fetch available slots"
                );
            }
            return {
                data: data.data as AvailableSlotsResponse,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    createBooking: async (
        payload: CreateBookingPayload
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/booking`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to create booking"
                );
            }
            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    updateTutorBookingStatus: async (
        bookingId: string, status: TutorBookingStatus
    ) => {
        try {
            const res = await fetch(`${API_URL}/booking/${bookingId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to create booking"
                );
            }
            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    updateStudentBookingStatus: async (
        bookingId: string, status: StudentBookingStatus
    ) => {
        try {
            const res = await fetch(`${API_URL}/booking/${bookingId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to create booking"
                );
            }
            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    updateAdminBookingStatus: async (
        bookingId: string,
        status: BookingStatus
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/booking/${bookingId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ?? "Failed to update booking"
                );
            }
            return { data, error: null, };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },
};
