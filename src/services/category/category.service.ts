import { env } from "@/env";
import { GetCategoryParams } from "@/types/category.type";

const API_URL = env.NEXT_PUBLIC_API_URL;


export const categoryService = {

    getAll: async (params?: GetCategoryParams) => {
        try {
            const url = new URL(`${API_URL}/category`);

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
                return { data: null, error: "Failed to fetch categories" };
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

    getCategoryById: async (id: string) => {

        try {
            const res = await fetch(`${API_URL}/category/${id}`, {
                // next: { revalidate: 60 },
            });

            if (!res.ok) {
                return { data: null, error: "Failed to fetch courses" };
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

    getById: async (params?: GetCategoryParams) => {
        // console.log("cat params:", params);

        try {
            const url = new URL(`${API_URL}/category/${params?.id}`);

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
                return { data: null, error: "Failed to fetch courses" };
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

};