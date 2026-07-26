"use client";

import { conversationClientService } from "@/services/message/conversation.client.service";
import { CreateConversationPayload } from "@/types/conversation.type";
import { useMutation } from "@tanstack/react-query";


export const useCreateConversation = () => {
    return useMutation({
        mutationFn: (
            payload: CreateConversationPayload
        ) =>
            conversationClientService.createConversation(
                payload
            ),
    });
};