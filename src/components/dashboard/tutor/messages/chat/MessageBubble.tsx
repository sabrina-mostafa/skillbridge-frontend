"use client";

import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Message } from "@/types/message.type";
import { User } from "@/types/user.type";
import { Check, CheckCheck } from "lucide-react";

type Props = {
    message: Message;
    currentUser: User;
};

export default function MessageBubble({
    message,
    currentUser,
}: Props) {
    const isMine = message.sender.id === currentUser.id;

    return (
        <div
            className={cn(
                "flex w-full mb-3",
                isMine
                    ? "justify-end"
                    : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
                    isMine
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                )}
            >
                <p className="break-words text-sm">
                    {message.content}
                </p>

                <div
                    className={cn(
                        "mt-1 flex items-center justify-end gap-2 text-[11px]",
                        isMine
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                    )}
                >
                    <span>
                        {format(
                            new Date(message.createdAt),
                            "hh:mm a"
                        )}
                    </span>

                    {isMine && (
                        <span
                            className={`flex items-center ml-1 transition-colors duration-200 ${message.isRead
                                ? "text-indigo-200"
                                : "text-indigo-300"
                                }`}
                        >
                            {message.isRead ? (
                                <CheckCheck size={15} strokeWidth={2.5} />
                            ) : (
                                <Check size={15} strokeWidth={2.5} />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}