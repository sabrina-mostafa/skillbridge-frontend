import { env } from "@/env";
import { cookies } from "next/headers";



const API_URL = env.API_URL;


interface GetTutorParams {
    isFeatured?: string;
    status?: string;
    course?: string;
    searchTerm?: string;

    minRating?: number;
    minPrice?: number;
    maxPrice?: number;

    page?: number;
    limit?: number;

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

        const url = new URL(`${API_URL}/tutors`);

        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        const res = await fetch(url.toString(), {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        return await res.json();
    },
};
