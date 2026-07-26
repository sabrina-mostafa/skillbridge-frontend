import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;


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
    getAllTutors: async (params?: GetTutorParams) => {
        try {
            const url = new URL(`${API_URL}/tutors`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== null && value !== undefined && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const res = await fetch(url.toString(), {
                // next: { revalidate: 60 },
            });

            if (!res.ok) {
                return { data: null, error: "Failed to fetch tutors" };
            }
            const result = await res.json();

            return { data: result, error: null };

        } catch (error) {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getTutorById: async (tutorId: string) => {
        try {
            // console.log("tutorId", tutorId);

            const res = await fetch(`${API_URL}/tutors/${tutorId}`);

            const data = await res.json();

            return { data: data, error: null };

        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong!" } };
        }
    },

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
            console.log("tutorId:", tutorId);
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