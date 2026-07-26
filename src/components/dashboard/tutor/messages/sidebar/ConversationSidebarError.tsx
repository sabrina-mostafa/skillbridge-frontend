"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    message?: string;
    onRetry?: () => void;
};

export default function ConversationSidebarError({
    message = "Failed to load conversations.",
    onRetry,
}: Props) {
    return (
        <aside className="w-76 lg:w-96 border-r bg-background">
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 rounded-full bg-destructive/10 p-4">
                    <TriangleAlert className="h-8 w-8 text-destructive" />
                </div>

                <h2 className="text-lg font-semibold">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    {message}
                </p>

                {onRetry && (
                    <Button
                        className="mt-6"
                        onClick={onRetry}
                    >
                        Try Again
                    </Button>
                )}
            </div>
        </aside>
    );
}