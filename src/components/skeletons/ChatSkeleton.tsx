"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
    return (
        <div className="flex h-full flex-1 flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 border-b p-4">
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
                <div className="flex justify-start">
                    <Skeleton className="h-16 w-56 rounded-2xl" />
                </div>

                <div className="flex justify-end">
                    <Skeleton className="h-16 w-48 rounded-2xl" />
                </div>

                <div className="flex justify-start">
                    <Skeleton className="h-20 w-64 rounded-2xl" />
                </div>

                <div className="flex justify-end">
                    <Skeleton className="h-14 w-40 rounded-2xl" />
                </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>
        </div>
    );
}