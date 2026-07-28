import { UserStatus } from "@/constants/user/UserStatus";
// import { env } from "@/env";
import { GetReportQuery, ReportFormat, ReportType } from "@/types/reports.type";

// const API_URL = env.NEXT_PUBLIC_API_URL;
const API_URL = "/api";


export const adminClientService = {
    updateUserStatus: async (
        userId: string,
        status: UserStatus
    ) => {
        try {
            const res = await fetch(`${API_URL}/admin/${userId}/status`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update user status");
            }

            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error : new Error("Unknown error"),
            };
        }
    },

    updateTutorFeatured: async (
        tutorId: string,
        isFeatured: boolean
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/admin/tutors/${tutorId}/featured`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isFeatured,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to update featured status"
                );
            }

            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    deleteMessage: async (messageId: string) => {
        try {
            const res = await fetch(
                `${API_URL}/admin/contact/${messageId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message ??
                    "Failed to update featured status"
                );
            }
            return { data, error: null, };

        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown error"),
            };
        }
    },

    getReports: async (query: GetReportQuery) => {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                params.set(key, String(value));
            }
        });

        const response = await fetch(
            `${API_URL}/admin/reports?${params.toString()}`,
            {
                credentials: "include",
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch reports");
        }

        return response.json();
    },

    generateReport: async (
        type: ReportType,
        query?: {
            from?: string;
            to?: string;
            format?: Exclude<ReportFormat, "json">;
        }
    ) => {
        const params = new URLSearchParams();

        Object.entries(query ?? {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                params.set(key, String(value));
            }
        });

        const response = await fetch(
            `${API_URL}/admin/reports/${type}?${params.toString()}`,
            {
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to export report");
        }

        // Convert response to file
        const blob = await response.blob();

        // Read filename from backend
        const disposition = response.headers.get("Content-Disposition");

        let filename = `${type}.${query?.format}`;

        if (disposition) {
            const match = disposition.match(/filename="?(.+)"?/);

            if (match?.[1]) {
                filename = match[1];
            }
        }

        // Download
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    },

};

