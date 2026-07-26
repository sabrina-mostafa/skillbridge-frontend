"use client";

import { MessagesSquare } from "lucide-react";

export default function ConversationSidebarEmpty() {
    return (
        <aside className="h-full w-full lg:w-96 border-r bg-background">
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                    <MessagesSquare className="h-8 w-8 text-muted-foreground" />
                </div>

                <h2 className="text-lg font-semibold">
                    No conversations yet
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Your conversations will appear here after you start chatting
                    with a tutor or student.
                </p>
            </div>
        </aside>
    );
}