// import { env } from "@/env";

// const API_URL = env.NEXT_PUBLIC_API_URL;
const API_URL = "/api";


export type CreateStudentPayload = {
    bio?: string;
    education?: string;
    categories: string[];
};

export type UpdateStudentPayload = {
    bio?: string;
    education?: string;
    categories?: string[];
};


export const studentClientService = {
    createProfile: async (payload: CreateStudentPayload) => {
        try {
            const res = await fetch(
                `${API_URL}/students`,
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
                    "Failed to create student profile"
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

    updateProfile: async (studentId: string, payload: UpdateStudentPayload) => {
        try {
            const res = await fetch(`${API_URL}/students/${studentId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("dataS:", data);

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update student profile");
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