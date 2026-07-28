import { env } from "@/env";
import { cookies } from "next/headers";



const API_URL = env.API_URL;

export const studentServerService = {

    getMyProfile: async () => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(
                `${API_URL}/students/me`,
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

    getUserProfile: async (studentId: string) => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(
                `${API_URL}/students/${studentId}`,
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

    updateProfile: async (studentId: string, payload: {
        bio?: string;
        education?: string;
        categories?: string[];
    }) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/students/${studentId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("dataa:", data);

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update profile");
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