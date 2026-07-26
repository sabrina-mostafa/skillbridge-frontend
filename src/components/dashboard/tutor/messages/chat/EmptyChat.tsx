"use client";

import { MessageCircleMore } from "lucide-react";

export default function EmptyChat() {
    return (
        <div className="h-full px-3 flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-5">
                <MessageCircleMore className="h-10 w-10 text-muted-foreground" />
            </div>

            <div>
                <h2 className="text-lg font-semibold">
                    No conversation selected
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Choose a conversation from the sidebar to start chatting.
                </p>
            </div>
        </div>
    );
}