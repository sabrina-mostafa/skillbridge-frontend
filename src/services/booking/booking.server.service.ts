import { cookies } from "next/headers";

import { env } from "@/env";
import { SessionStatus } from "@/constants/booking/BookingSessionStatus";
import { BookingResponse } from "@/types/booking.types";
import { GetMineResponse } from "./booking.client.service";

const API_URL = env.NEXT_PUBLIC_API_URL;

export type BookingFilters = {
    page?: number;
    limit?: number;
    status?: string;
    sessionStatus?: SessionStatus;
    meetingType?: string;
    startDate?: string;
    endDate?: string;
    sortBy?:
    | "createdAt"
    | "date"
    | "status"
    | "startTime"
    | "endTime"
    | "meetingType";
    sortOrder?: "asc" | "desc";
};

export type GetAllBookingFilters = {
    searchTerm?: string;
    status?: string;
    tutorId?: string;
    studentId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "date" | "status";
    sortOrder?: "asc" | "desc";
};


export const bookingServerService = {
    getMine: async (
        filters?: BookingFilters
    ): Promise<GetMineResponse> => {
        try {
            const params = new URLSearchParams();

            if (filters?.page)
                params.append("page", String(filters.page));

            if (filters?.limit)
                params.append("limit", String(filters.limit));

            if (filters?.status)
                params.append("status", filters.status);

            if (filters?.sessionStatus)
                params.append(
                    "sessionStatus",
                    filters.sessionStatus
                );

            if (filters?.meetingType)
                params.append(
                    "meetingType",
                    filters.meetingType
                );

            if (filters?.startDate)
                params.append(
                    "startDate",
                    filters.startDate
                );

            if (filters?.endDate)
                params.append(
                    "endDate",
                    filters.endDate
                );

            if (filters?.sortBy)
                params.append("sortBy", filters.sortBy);

            if (filters?.sortOrder)
                params.append(
                    "sortOrder",
                    filters.sortOrder
                );

            const cookieStore = await cookies();

            const res = await fetch(
                `${API_URL}/booking/me?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        Cookie: cookieStore.toString(),
                    },
                    cache: "no-store",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to fetch bookings",
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

    getAll: async (filters?: GetAllBookingFilters) => {
        try {
            const params = new URLSearchParams();

            if (filters?.searchTerm)
                params.append("searchTerm", filters.searchTerm);

            if (filters?.status)
                params.append("status", filters.status);

            if (filters?.tutorId)
                params.append("tutorId", filters.tutorId);

            if (filters?.studentId)
                params.append("studentId", filters.studentId);

            if (filters?.startDate)
                params.append("startDate", filters.startDate);

            if (filters?.endDate)
                params.append("endDate", filters.endDate);

            if (filters?.page)
                params.append("page", String(filters.page));

            if (filters?.limit)
                params.append("limit", String(filters.limit));

            if (filters?.sortBy)
                params.append("sortBy", filters.sortBy);

            if (filters?.sortOrder)
                params.append("sortOrder", filters.sortOrder);

            const cookieStore = await cookies();

            const res = await fetch(
                `${API_URL}/booking/all?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        Cookie: cookieStore.toString(),
                    },
                    cache: "no-store",
                }
            );
            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to fetch bookings",
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
};