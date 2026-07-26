"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function StudentManagerSkeleton() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="space-y-3 p-4 border rounded-2xl">
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-5 w-120 max-w-full" />
            </div>

            {/* Summary */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border bg-card p-5"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-10 w-16" />
                                <Skeleton className="h-3 w-36" />
                            </div>

                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="rounded-2xl border bg-card p-5">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    <div className="flex items-start gap-3">
                        <Skeleton className="h-11 w-11 rounded-xl" />

                        <div className="space-y-2">
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border bg-card">

                <div className="border-b p-6">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="mt-2 h-4 w-64" />
                </div>

                <div className="overflow-hidden">

                    {/* Header */}
                    <div className="grid grid-cols-7 gap-6 border-b px-6 py-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-4 w-20"
                            />
                        ))}
                    </div>

                    {/* Rows */}
                    {Array.from({ length: 6 }).map((_, row) => (
                        <div
                            key={row}
                            className="grid grid-cols-7 items-center gap-6 border-b px-6 py-5 last:border-none"
                        >
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>

                            <Skeleton className="h-4 w-44" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-7 w-14 rounded-full" />
                            <Skeleton className="h-7 w-14 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="ml-auto h-9 w-9 rounded-md" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}