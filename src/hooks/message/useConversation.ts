"use client";

import { conversationClientService } from "@/services/message/conversation.client.service";
import { useQuery } from "@tanstack/react-query";



export const useConversation = (
    conversationId?: string
) => {
    return useQuery({
        enabled: !!conversationId,

        queryKey: [
            "conversation",
            conversationId,
        ],

        queryFn: async () => {
            const res =
                await conversationClientService.getById(
                    conversationId!
                );

            if (res.error) {
                throw new Error(res.error);
            }

            return res.data;
        },
    });
};