import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;


export type createCategoryPayload = {
    name: string;
    shortDesc?: string;
    description?: string;
    thumbnail?: string;
    learningOutcomes?: string[];
    parentId?: string | null;
    isFeatured?: boolean;
};

export type updateCategoryPayload = {
    name?: string;
    shortDesc?: string;
    description?: string;
    thumbnail?: string;
    learningOutcomes?: string[];
    parentId?: string | null;
    isFeatured?: boolean;
};


export const categoryClientService = {
    create: async (payload: createCategoryPayload) => {
        try {
            const res = await fetch(`${API_URL}/category`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result?.message ??
                        "Failed to create category",
                };
            }

            return {
                data: result,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    update: async (
        categoryId: string,
        payload: updateCategoryPayload
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/category/${categoryId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result?.message ??
                        "Failed to update category",
                };
            }

            return {
                data: result,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    delete: async (categoryId: string) => {
        try {
            const res = await fetch(
                `${API_URL}/category/${categoryId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result?.message ??
                        "Failed to delete category",
                };
            }

            return {
                data: result,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },
};