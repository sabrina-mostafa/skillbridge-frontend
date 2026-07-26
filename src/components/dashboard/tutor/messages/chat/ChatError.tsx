"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    message?: string;
    onRetry?: () => void;
};

export default function ChatError({
    message = "Something went wrong while loading the conversation.",
    onRetry,
}: Props) {
    return (
        <div className="p-2 flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-destructive/10 p-5">
                <TriangleAlert className="h-10 w-10 text-destructive" />
            </div>

            <div>
                <h2 className="text-lg font-semibold">
                    Failed to load chat
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    {message}
                </p>
            </div>

            {onRetry && (
                <Button onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
}