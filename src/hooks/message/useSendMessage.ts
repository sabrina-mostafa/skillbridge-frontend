"use client";

import { useMutation } from "@tanstack/react-query";
import { SendMessagePayload } from "@/types/message.type";
import { messageClientService } from "@/services/message/message.client.service";


export const useSendMessage = (
    conversationId: string
) => {
    return useMutation({
        mutationFn: (
            payload: SendMessagePayload
        ) =>
            messageClientService.sendMessage(
                conversationId,
                payload
            ),
    });
};