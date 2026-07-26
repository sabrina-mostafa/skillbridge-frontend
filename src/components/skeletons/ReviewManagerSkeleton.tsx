"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewManagerSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="space-y-3 border rounded-2xl p-4">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-[430px]" />
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border bg-card p-6"
                    >
                        <Skeleton className="mb-4 h-5 w-24" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>

            {/* Pending Reviews */}
            <div className="rounded-2xl border bg-card p-6 space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-44" />
                    <Skeleton className="h-4 w-72" />
                </div>

                {Array.from({ length: 2 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border p-4"
                    >
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                        </div>

                        <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="rounded-2xl border bg-card p-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-10 w-full"
                        />
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border bg-card">
                <div className="border-b p-6 space-y-2">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="space-y-4 p-6">
                    {Array.from({ length: 6 }).map((_, row) => (
                        <div
                            key={row}
                            className="grid grid-cols-6 items-center gap-4"
                        >
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-28" />
                            <div className="flex justify-end gap-2">
                                <Skeleton className="h-9 w-9 rounded-md" />
                                <Skeleton className="h-9 w-9 rounded-md" />
                                <Skeleton className="h-9 w-9 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t p-6">
                    <Skeleton className="h-5 w-36" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                </div>
            </div>
        </div>
    );
}