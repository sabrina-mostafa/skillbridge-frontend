"use client";

import {
    Conversation,
    SelectedChat,
} from "@/types/conversation.type";
import { User } from "@/types/user.type";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { usePresence } from "@/providers/PresenceProvider";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    conversation?: Conversation | null;
    selectedChat: SelectedChat;
    currentUser: User;
    onBack: () => void;
};

export default function ChatHeader({
    conversation,
    selectedChat,
    currentUser,
    onBack,
}: Props) {
    const otherUser = conversation
        ? conversation.participants.find(
            (participant) =>
                participant.user.id !== currentUser.id
        )?.user
        : {
            id: selectedChat.participantId,
            name: selectedChat.participantName,
            image: selectedChat.participantImage,
        };

    const onlineUsers = usePresence();

    const isOnline =
        !!otherUser &&
        onlineUsers.has(otherUser.id);

    return (
        <div className="flex items-center gap-4 border-b px-6 py-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="lg:hidden cursor-pointer rounded-full border-2 border-indigo-500/60"
            >
                <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>

            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={otherUser?.image ?? ""}
                    alt={otherUser?.name}
                />

                <AvatarFallback>
                    {otherUser?.name
                        ?.charAt(0)
                        .toUpperCase() ?? "U"}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
                <h2 className="truncate font-semibold">
                    {otherUser?.name}
                </h2>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                        className={cn(
                            "h-2 w-2 rounded-full",
                            isOnline
                                ? "bg-green-500"
                                : "bg-gray-400"
                        )}
                    />

                    <span>
                        {isOnline
                            ? "Online"
                            : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    );
}