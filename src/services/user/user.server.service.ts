import { env } from "@/env";
import { cookies } from "next/headers";



const AUTH_URL = env.AUTH_URL;


export const userServerService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();

            // console.log(cookieStore.getAll());
            // console.log(cookieStore.toString());

            const res = await fetch(
                `${AUTH_URL}/get-session`,
                {
                    method: "GET",
                    headers: {
                        Cookie: cookieStore.toString()
                    },
                    cache: "no-store",
                }
            );

            const data = await res.json();
            // console.log("session:", data);

            if (!res.ok) {
                throw new Error(
                    data?.message || "Failed to get session"
                );
            }
            return { data, error: null, };

        } catch (error) {
            return { data: null, error, };
        }
    },
};

