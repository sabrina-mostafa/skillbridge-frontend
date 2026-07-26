"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/types/message.type";
import { useQuery } from "@tanstack/react-query";

import { messageClientService } from "@/services/message/message.client.service";

import { User } from "@/types/user.type";
import MessageBubble from "./MessageBubble";
import { conversationClientService } from "@/services/message/conversation.client.service";
import { SOCKET_EVENTS } from "@/constants/message/socketEvents";

type Props = {
    conversationId: string;
    currentUser: User;
};

export default function MessageList({
    conversationId,
    currentUser,
}: Props) {

    const socket = useSocket();
    const queryClient = useQueryClient();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const { data, isLoading, error, } = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            const result =
                await messageClientService.getMessages(
                    conversationId
                );

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
    });

    useEffect(() => {
        if (!conversationId) return;

        socket.emit( SOCKET_EVENTS.CONVERSATION_JOIN, conversationId);

        const handleNewMessage = async (
            message: Message
        ) => {
            console.log("📩 SOCKET MESSAGE:", message);

            if (message.conversationId !== conversationId) {
                return;
            }

            queryClient.setQueryData<Message[]>(
                ["messages", conversationId],
                (old = []) => {

                    // remove optimistic message
                    const filtered = old.filter(
                        (m) =>
                            !(
                                m.id.startsWith("temp-") &&
                                m.content === message.content &&
                                m.senderId === message.senderId
                            )
                    );
                    const exists = filtered.some(
                        (m) => m.id === message.id
                    );

                    if (exists) {
                        return filtered;
                    }

                    return [
                        ...filtered,
                        message,
                    ];
                }
            );

            // Chat window is open, so mark as read
            if (message.senderId !== currentUser.id) {

                await conversationClientService.markConversationRead(conversationId);

                queryClient.invalidateQueries({
                    queryKey: [
                        "conversations",
                    ],
                });
            }
        };
        socket.on(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);

        const handleMessageRead = (
            data: {
                conversationId: string;
                readBy: string;
            }
        ) => {

            if (data.conversationId !== conversationId) {
                return;
            }

            queryClient.setQueryData<Message[]>(
                ["messages", conversationId],
                (old = []) =>
                    old.map((message) => {

                        // Only update my sent messages
                        if (message.senderId === currentUser.id) {
                            return {
                                ...message,
                                isRead: true,
                            };
                        }
                        return message;
                    })
            );
        };
        socket.on(SOCKET_EVENTS.CONVERSATION_READ, handleMessageRead);

        const handleTypingStart = (
            data: {
                conversationId: string;
                userId: string;
            }
        ) => {

            if (data.conversationId !== conversationId) {
                return;
            }
            setIsTyping(true);
        };
        socket.on(SOCKET_EVENTS.TYPING_START, handleTypingStart);

        const handleTypingStop = (
            data: {
                conversationId: string;
                userId: string;
            }
        ) => {

            if (data.conversationId !== conversationId) {
                return;
            }
            setIsTyping(false);
        };
        socket.on(SOCKET_EVENTS.TYPING_STOP, handleTypingStop);


        return () => {
            socket.emit(SOCKET_EVENTS.CONVERSATION_LEAVE, conversationId);
            socket.off(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);
            socket.off(SOCKET_EVENTS.CONVERSATION_READ, handleMessageRead);
            socket.off(SOCKET_EVENTS.TYPING_START, handleTypingStart);
            socket.off(SOCKET_EVENTS.TYPING_STOP, handleTypingStop);
        };
    }, [socket, conversationId, queryClient, currentUser.id,]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [data]);


    if (isLoading) {
        return (
            <div className="p-3 flex-1 flex items-center justify-center">
                Loading messages...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-3 flex-1 flex items-center justify-center">
                Failed to load messages
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {data.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                    currentUser={currentUser}
                />
            ))}

            {
                isTyping && (
                    <div className="text-sm text-muted-foreground p-2 mb-2">
                        Typing...
                    </div>
                )
            }

            <div ref={bottomRef} />
        </div>
    );
}