import { env } from "@/env";
import { cookies } from "next/headers";



const API_URL = env.API_URL;


export interface GetTutorParams {
    isFeatured?: string;
    course?: string;
    searchTerm?: string;

    minRating?: string;
    minPrice?: string;
    maxPrice?: string;

    page?: string;
    limit?: string;

    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export const tutorServerService = {

    getMyProfile: async () => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(
                `${API_URL}/tutors/me`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch tutor profile"
                );
            }
            return { data, error: null, };

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error
                    ? error
                    : new Error("Unknown error"),
            };
        }
    },

    getUserProfile: async (tutorId: string) => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(
                `${API_URL}/tutors/${tutorId}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch student profile"
                );
            }
            return { data, error: null, };

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error
                    ? error
                    : new Error("Unknown error"),
            };
        }
    },

    getAllTutors: async (query?: GetTutorParams) => {
        const cookieStore = await cookies();
        
        try {
            const url = new URL(`${API_URL}/tutors`);

            if (query) {
                Object.entries(query).forEach(([key, value]) => {
                    if (value !== null && value !== undefined && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const res = await fetch(url.toString(),
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch student profile"
                );
            }

            return { data: data, error: null };

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error
                    ? error
                    : new Error("Unknown error"),
            };
        }
    },

    getTutorById: async (tutorId: string) => {
        const cookieStore = await cookies();

        try {
            const res = await fetch(`${API_URL}/tutors/${tutorId}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch student profile"
                );
            }

            return { data: data, error: null };

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error
                    ? error
                    : new Error("Unknown error"),
            };
        }
    },
};
