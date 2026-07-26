import { env } from "@/env";
import { UserRoles } from "@/constants/user/UserRoles";


const API_URL = env.NEXT_PUBLIC_API_URL;

type ResendVerificationPayload = {
    email?: string;
};

export const userClientService = {
    updateRole: async (role: UserRoles) => {
        try {
            const res = await fetch(
                `${API_URL}/users/select-role`,
                {
                    method: "PATCH",
                    credentials: "include", // important for Better Auth cookie
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();
            console.log("data:", data);

            if (!res.ok) {
                throw new Error(
                    data?.message || "Failed to update role"
                );
            }
            return { data, error: null, };

        } catch (error) {
            return { data: null, error, };
        }
    },

    updateProfileImage: async (image: { image: string }) => {

        try {
            const res = await fetch(
                `${API_URL}/users/profile-image`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(image)
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update profile");
            }
            return { data, error: null };

        } catch (error) {

            return {
                data: null,
                error:
                    error instanceof Error ?
                        error : new Error("Unknown error")
            }
        }
    },

    resendVerificationEmail: async (payload: ResendVerificationPayload) => {
        const res = await fetch(
            `${API_URL}/users/resend-verification`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Failed to resend verification email");
        }

        return data;
    },

};