"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationSidebarSkeleton() {
    return (
        <aside className="w-full lg:w-96 border-r bg-background overflow-y-auto">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 border-b p-4"
                >
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />

                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-12" />
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <Skeleton className="h-3 flex-1" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </aside>
    );
}