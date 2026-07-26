"use client";

import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Conversation } from "@/types/conversation.type";
import { User } from "@/types/user.type";
import { usePresence } from "@/providers/PresenceProvider";

type Props = {
    conversation: Conversation;
    currentUser: User;
    active?: boolean;
    onClick: () => void;
};

export default function ConversationCard({
    conversation,
    currentUser,
    active = false,
    onClick,
}: Props) {
    const otherParticipant =
        conversation.participants.find(
            (participant) => participant.user.id !== currentUser.id
        )?.user ?? null;

    const lastMessage = conversation.messages[0];

    const onlineUsers = usePresence();
    const isOnline =
        otherParticipant &&
        onlineUsers.has(otherParticipant.id);


    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            aria-label={`Conversation with ${otherParticipant?.name}`}
            className={cn(
                "w-full cursor-pointer flex items-center gap-3 p-4 text-left transition-colors border-b hover:bg-muted/50",
                active && "bg-muted border-l-4 border-l-primary"
            )}
        >
            <div className="relative shrink-0">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={otherParticipant?.image ?? ""}
                        alt={otherParticipant?.name ?? ""}
                    />

                    <AvatarFallback>
                        {otherParticipant?.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                </Avatar>

                {/* Online indicator (Socket later) */}
                <span className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                    isOnline
                        ? "bg-green-500"
                        : "bg-gray-400"
                )} />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold">
                        {otherParticipant?.name}
                    </h3>

                    {lastMessage && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(
                                new Date(lastMessage.createdAt),
                                {
                                    addSuffix: true,
                                }
                            )}
                        </span>
                    )}
                </div>

                <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-sm text-muted-foreground">
                        {lastMessage?.content ??
                            "Start a conversation"}
                    </p>

                    {conversation.unreadCount > 0 && (
                        <Badge
                            className="rounded-full px-2 min-w-6 h-6 flex items-center justify-center"
                        >
                            {conversation.unreadCount}
                        </Badge>
                    )}
                </div>
            </div>
        </button>
    );
}