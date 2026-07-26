"use client";

import { Users } from "lucide-react";

export default function ContactListEmpty() {
    return (
        <aside className="h-full w-full lg:w-96 border-r bg-background">
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 rounded-full bg-muted p-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                </div>

                <h2 className="text-lg font-semibold">
                    No contacts yet
                </h2>

                <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
                    Your tutors or students will appear here after you
                    have an active booking. Once they do, you can start
                    a conversation anytime.
                </p>
            </div>
        </aside>
    );
}