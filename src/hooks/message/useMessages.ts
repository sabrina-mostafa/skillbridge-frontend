"use client";

import { messageClientService } from "@/services/message/message.client.service";
import { useQuery } from "@tanstack/react-query";



export const useMessages = (
    conversationId?: string
) => {
    return useQuery({
        enabled: !!conversationId,

        queryKey: [
            "messages",
            conversationId,
        ],

        queryFn: async () => {
            const res =
                await messageClientService.getMessages(
                    conversationId!
                );

            if (res.error) {
                throw new Error(res.error);
            }

            return res.data;
        },
    });
};