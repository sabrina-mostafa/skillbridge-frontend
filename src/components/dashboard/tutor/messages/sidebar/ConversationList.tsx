"use client";

import { useEffect, useMemo } from "react";
import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { useSocket } from "@/providers/SocketProvider";

import { conversationClientService } from "@/services/message/conversation.client.service";

import {
    ConversationResponse,
    SelectedChat,
} from "@/types/conversation.type";
import { Message } from "@/types/message.type";
import { User } from "@/types/user.type";

import ConversationCard from "./ConversationCard";

import { SOCKET_EVENTS } from "@/constants/message/socketEvents";

import ConversationSidebarSkeleton from "@/components/skeletons/ConversationSidebarSkeleton";
import ConversationSidebarError from "./ConversationSidebarError";
import ConversationSidebarEmpty from "./ConversationSidebarEmpty";

type ConversationUpdatedPayload = {
    conversationId: string;
    lastMessage: Message;
    unreadCount: number;
};

type Props = {
    currentUser: User;
    selectedChat: SelectedChat | null;
    onSelectChat: (
        chat: SelectedChat
    ) => void;
    search: string;
};

export default function ConversationList({
    currentUser,
    selectedChat,
    onSelectChat,
    search,
}: Props) {
    const socket = useSocket();
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            const result =
                await conversationClientService.getMine();

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
    });

    useEffect(() => {
        const handleConversationUpdated = (
            payload: ConversationUpdatedPayload
        ) => {
            queryClient.setQueryData<ConversationResponse>(
                ["conversations"],
                (old) => {
                    if (!old) return old;

                    const updatedConversations =
                        old.data.map((conversation) => {
                            if (
                                conversation.id !==
                                payload.conversationId
                            ) {
                                return conversation;
                            }

                            return {
                                ...conversation,
                                lastMessageAt:
                                    payload.lastMessage.createdAt,
                                messages: [
                                    payload.lastMessage,
                                ],
                                unreadCount:
                                    payload.unreadCount,
                            };
                        });

                    updatedConversations.sort(
                        (a, b) =>
                            new Date(
                                b.lastMessageAt ?? 0
                            ).getTime() -
                            new Date(
                                a.lastMessageAt ?? 0
                            ).getTime()
                    );

                    return {
                        ...old,
                        data: updatedConversations,
                    };
                }
            );
        };

        socket.on(
            SOCKET_EVENTS.CONVERSATION_UPDATED,
            handleConversationUpdated
        );

        return () => {
            socket.off(
                SOCKET_EVENTS.CONVERSATION_UPDATED,
                handleConversationUpdated
            );
        };
    }, [socket, queryClient]);

    const filteredConversations =
        useMemo(() => {
            if (!data) return [];

            return data.data.filter(
                (conversation) => {
                    const otherUser =
                        conversation.participants.find(
                            (participant) =>
                                participant.user.id !==
                                currentUser.id
                        )?.user;

                    if (!otherUser) {
                        return false;
                    }

                    return otherUser.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );
                }
            );
        }, [
            data,
            search,
            currentUser.id,
        ]);

    if (isLoading) {
        return (
            <ConversationSidebarSkeleton />
        );
    }

    if (error) {
        return (
            <ConversationSidebarError
                message={
                    (error as Error).message
                }
                onRetry={() =>
                    queryClient.invalidateQueries({
                        queryKey: [
                            "conversations",
                        ],
                    })
                }
            />
        );
    }

    if (!filteredConversations.length) {
        return (
            <ConversationSidebarEmpty />
        );
    }

    return (
        <div className="divide-y">
            {filteredConversations.map(
                (conversation) => {
                    const otherUser =
                        conversation.participants.find(
                            (participant) =>
                                participant.user.id !==
                                currentUser.id
                        )!.user;

                    return (
                        <ConversationCard
                            key={conversation.id}
                            conversation={
                                conversation
                            }
                            currentUser={
                                currentUser
                            }
                            active={
                                selectedChat?.conversationId ===
                                conversation.id
                            }
                            onClick={() =>
                                onSelectChat({
                                    conversationId:
                                        conversation.id,
                                    participantId:
                                        otherUser.id,
                                    participantName:
                                        otherUser.name,
                                    participantImage:
                                        otherUser.image,
                                })
                            }
                        />
                    );
                }
            )}
        </div>
    );
}