"use client";

import { conversationClientService, ConversationFilters } from "@/services/message/conversation.client.service";
import { useQuery } from "@tanstack/react-query";



export const useConversations = (
    filters?: ConversationFilters
) => {
    return useQuery({
        queryKey: ["conversations", filters],
        queryFn: async () => {
            const res =
                await conversationClientService.getMine(
                    filters
                );

            if (res.error) {
                throw new Error(res.error);
            }

            return res.data;
        },
    });
};