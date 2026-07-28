// import { env } from "@/env";

// const API_URL = env.NEXT_PUBLIC_API_URL;
const API_URL = "/api";


// for filtering
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

export interface CreateTutorPayload {
    bio?: string;
    education?: string;
    experience: string;
    hourlyRate: number;
    categories: string[];
};

export interface UpdateTutorPayload {
    bio?: string;
    education?: string;
    experience?: string;
    hourlyRate?: number;
    categories?: string[];
};



export const tutorClientService = {
    createProfile: async (payload: CreateTutorPayload) => {
        try {
            const res = await fetch(
                `${API_URL}/tutors`,
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
                    data?.message ||
                    "Failed to create tutor profile"
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

    updateProfile: async (tutorId: string, payload: UpdateTutorPayload) => {
        try {
            const res = await fetch(`${API_URL}/tutors/${tutorId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("dataT:", data);

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update tutor profile");
            }

            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error : new Error("Unknown error"),
            };
        }
    },
};