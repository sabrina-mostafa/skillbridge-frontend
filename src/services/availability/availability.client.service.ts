import { env } from "@/env";
import {
    Availability,
    CreateAvailabilityPayload,
} from "@/types/availability.type";


const API_URL = env.NEXT_PUBLIC_API_URL;


export const availabilityClientService = {
    createAvailability: async (payload: CreateAvailabilityPayload) => {
        try {
            const res = await fetch(`${API_URL}/availability`, {
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
                    error: result.message || "Failed to create availability",
                };
            }

            return {
                data: result.data as Availability,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    updateAvailability: async (id: string, payload: CreateAvailabilityPayload) => {
        try {
            const res = await fetch(`${API_URL}/availability/${id}`, {
                method: "PATCH",
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
                    error: result.message || "Failed to create availability",
                };
            }

            return {
                data: result.data as Availability,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getMine: async () => {
        try {
            const res = await fetch(`${API_URL}/availability/me`, {
                method: "GET",
                credentials: "include",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: [],
                    error: result.message || "Failed to fetch availability",
                };
            }

            return {
                data: result.data as Availability[],
                error: null,
            };
        } catch {
            return {
                data: [],
                error: "Something went wrong",
            };
        }
    },

    delete: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/availability/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    error: result.message || "Failed to delete",
                };
            }

            return {
                error: null,
            };
        } catch {
            return {
                error: "Something went wrong",
            };
        }
    },
};
