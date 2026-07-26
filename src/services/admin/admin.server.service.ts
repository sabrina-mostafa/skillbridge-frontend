import { cookies } from "next/headers";
import { env } from "@/env";
import { GetAllMessagesQuery } from "@/types/public-contact-form.type";

const API_URL = env.API_URL;


export const adminServerService = {
    async getPlatformAnalytics() {
        const cookieStore = await cookies();

        try {
            const res = await fetch(
                `${API_URL}/admin/platform`,
                {
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString(),
                    },
                    cache: "no-store",
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return { data, error: null, };
        } catch (error) {
            return { data: null, error, };
        }
    },

    async getAllUsers(query?: {
        page?: number;
        limit?: number;
        searchTerm?: string;
        role?: string;
        isFeatured?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }) {
        const cookieStore = await cookies();

        try {
            const url = new URL(`${API_URL}/admin`);

            if (query) {
                Object.entries(query).forEach(([key, value]) => {
                    if (
                        value !== undefined &&
                        value !== null &&
                        value !== ""
                    ) {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const res = await fetch(url.toString(), {
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error,
            };
        }
    },

    async getContactMessages(query?: GetAllMessagesQuery) {
        const cookieStore = await cookies();

        const params = new URLSearchParams();

        if (query) {
            if (query.searchTerm) {
                params.set("searchTerm", query.searchTerm);
            }

            if (query.page) {
                params.set("page", query.page);
            }

            if (query.limit) {
                params.set("limit", query.limit);
            }

            if (query.sortBy) {
                params.set("sortBy", query.sortBy);
            }

            if (query.sortOrder) {
                params.set("sortOrder", query.sortOrder);
            }

            if (query.userType) {
                params.set("userType", query.userType);
            }

            if (query.inquiryType) {
                params.set("inquiryType", query.inquiryType);
            }
        }

        const url = `${API_URL}/admin/contact${params.toString() ? `?${params.toString()}` : ""
            }`;

        try {
            const res = await fetch(url, {
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return { data, error: null, };
        } catch (error) {
            return { data: null, error, };
        }
    },

};