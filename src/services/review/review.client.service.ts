import { env } from "@/env";
import { Review, ReviewResponse } from "@/types/review.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export type CreateReviewPayload = {
    bookingId: string;
    rating: number;
    comment?: string;
};

export type UpdateReviewPayload = {
    rating: number;
    comment?: string;
};

export type ReviewFilters = {
    page?: number;
    limit?: number;
    minRating?: number;
    sortBy?: "createdAt" | "rating";
    sortOrder?: "asc" | "desc";
};


export const reviewClientService = {

    getMyReviews: async (filters?: ReviewFilters) => {
        try {
            const params = new URLSearchParams();

            if (filters?.page) {
                params.append("page", String(filters.page));
            }

            if (filters?.limit) {
                params.append("limit", String(filters.limit));
            }

            if (filters?.minRating) {
                params.append(
                    "minRating",
                    String(filters.minRating)
                );
            }

            if (filters?.sortBy) {
                params.append("sortBy", filters.sortBy);
            }

            if (filters?.sortOrder) {
                params.append("sortOrder", filters.sortOrder);
            }

            const res = await fetch(
                `${API_URL}/review/my-reviews?${params.toString()}`,
                {
                    credentials: "include",
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
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getReviewByTutorId: async (
        tutorId: string,
        filters?: ReviewFilters
    ) => {
        try {
            const params = new URLSearchParams();

            if (filters?.page) {
                params.append("page", String(filters.page));
            }
            if (filters?.limit) {
                params.append("limit", String(filters.limit));
            }
            if (filters?.minRating) {
                params.append(
                    "minRating",
                    String(filters.minRating)
                );
            }
            if (filters?.sortBy) {
                params.append("sortBy", filters.sortBy);
            }
            if (filters?.sortOrder) {
                params.append("sortOrder", filters.sortOrder);
            }


            const res = await fetch(`${API_URL}/review/${tutorId}?${params.toString()}`,
                {
                    method: "GET",
                    credentials: "include",
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
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    createReview: async (payload: CreateReviewPayload) => {
        try {
            const res = await fetch(`${API_URL}/review`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to create review",
                };
            }

            return {
                data: result.data as Review,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    updateReview: async (
        reviewId: string,
        payload: UpdateReviewPayload
    ) => {
        try {
            const res = await fetch(`${API_URL}/review/${reviewId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to update review",
                };
            }

            return {
                data: result.data as Review,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    deleteReview: async (reviewId: string) => {
        try {
            const res = await fetch(`${API_URL}/review/${reviewId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to delete review",
                };
            }

            return {
                data: result.data as Review,
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