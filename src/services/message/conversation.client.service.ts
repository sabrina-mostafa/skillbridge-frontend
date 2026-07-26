import { env } from "@/env";
import { Contact, GetContactsResponse } from "@/types/contact.type";
import { Conversation, ConversationResponse, CreateConversationPayload } from "@/types/conversation.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export type ConversationFilters = {
    page?: number;
    limit?: number;
    searchTerm?: string;
};

export type GetConversationsResponse = {
    data: ConversationResponse | null;
    error: string | null;
};

export type GetConversationResponse = {
    data: Conversation | null;
    error: string | null;
};

export const conversationClientService = {
    getMine: async (
        filters?: ConversationFilters
    ): Promise<GetConversationsResponse> => {
        try {
            const params = new URLSearchParams();

            if (filters?.page)
                params.append("page", String(filters.page));

            if (filters?.limit)
                params.append("limit", String(filters.limit));

            if (filters?.searchTerm)
                params.append("searchTerm", filters.searchTerm);

            const res = await fetch(
                `${API_URL}/conversation?${params.toString()}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to fetch conversations",
                };
            }

            return {
                data: result.data as ConversationResponse,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getContacts: async (): Promise<GetContactsResponse> => {
        try {
            const res = await fetch(
                `${API_URL}/conversation/contacts`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to fetch contacts",
                };
            }

            return {
                data: result.data as Contact[],
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    getById: async (
        conversationId: string
    ): Promise<GetConversationResponse> => {
        try {
            const res = await fetch(
                `${API_URL}/conversation/${conversationId}`,
                {
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error:
                        result.message ??
                        "Failed to fetch conversation",
                };
            }

            return {
                data: result.data as Conversation,
                error: null,
            };
        } catch {
            return {
                data: null,
                error: "Something went wrong",
            };
        }
    },

    createConversation: async (
        payload: CreateConversationPayload
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/conversation`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.message ??
                    "Failed to create conversation"
                );
            }

            return {
                data: result.data as Conversation,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            };
        }
    },

    markConversationRead: async (
        conversationId: string
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/conversation/${conversationId}/read`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.message ??
                    "Failed to mark conversation as read"
                );
            }

            return {
                data: result.data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            };
        };
    }
};