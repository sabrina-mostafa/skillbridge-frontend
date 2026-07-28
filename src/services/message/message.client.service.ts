// import { env } from "@/env";
import { Message, SendMessagePayload } from "@/types/message.type";

// const API_URL = env.NEXT_PUBLIC_API_URL;
const API_URL = "/api";


export type GetMessagesResponse = {
    data: Message[] | null;
    error: string | null;
};

export type SendMessageResponse = {
    data: Message | null;
    error: string | null;
};

export const messageClientService = {
    getMessages: async (
        conversationId: string
    ): Promise<GetMessagesResponse> => {
        try {
            const res = await fetch(
                `${API_URL}/message/${conversationId}`,
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
                        "Failed to fetch messages",
                };
            }

            return {
                data: result.data as Message[],
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            };
        }
    },

    sendMessage: async (
        conversationId: string,
        payload: SendMessagePayload
    ): Promise<SendMessageResponse> => {
        try {
            const res = await fetch(
                `${API_URL}/message/${conversationId}`,
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
                    "Failed to send message"
                );
            }

            return {
                data: result.data as Message,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            };
        }
    },

    markMessageRead: async (
        messageId: string
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/message/${messageId}/read`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.message ??
                    "Failed to mark message as read"
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
                        : "Unknown error",
            };
        }
    },
};