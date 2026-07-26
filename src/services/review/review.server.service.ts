import { cookies } from "next/headers";
import { env } from "@/env";
import {
    GetAllReviewsQuery,
    ReviewResponse,
} from "@/types/review.type";


const API_URL = env.NEXT_PUBLIC_API_URL;

export const reviewServerService = {
    getAll: async (filters?: GetAllReviewsQuery) => {
        const cookieStore = await cookies();

        const params = new URLSearchParams();

        if (filters?.searchTerm) {
            params.append("searchTerm", filters.searchTerm);
        }
        if (filters?.page) {
            params.append("page", filters.page);
        }
        if (filters?.limit) {
            params.append("limit", filters.limit);
        }
        if (filters?.minRating) {
            params.append(
                "minRating",
                filters.minRating
            );
        }
        if (filters?.sortBy) {
            params.append(
                "sortBy",
                filters.sortBy
            );
        }
        if (filters?.sortOrder) {
            params.append(
                "sortOrder",
                filters.sortOrder
            );
        }

        const res = await fetch(
            `${API_URL}/review?${params.toString()}`,
            {
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
                    "Failed to fetch reviews",
            };
        }

        return {
            data: result.data as ReviewResponse,
            error: null,
        };
    },
};