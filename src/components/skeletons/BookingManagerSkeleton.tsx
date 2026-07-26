import { Skeleton } from "@/components/ui/skeleton";

export default function BookingManagerSkeleton() {
    return (
        <div className="space-y-8">

            {/* Section Header */}
            <div className="rounded-xl border p-4 space-y-2">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-80" />
            </div>

            {/* Filters */}
            <div className="rounded-xl border p-4">
                <div className="flex justify-between gap-4">
                    <Skeleton className="h-10 w-55" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border bg-card shadow-sm">

                {/* Table Header */}
                <div className="border-b px-6 py-5 space-y-2">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-60" />
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-7 gap-4 border-b px-6 py-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-20" />
                    ))}
                </div>

                {/* Rows */}
                <div className="divide-y">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-7 items-center gap-4 px-6 py-5"
                        >
                            {/* Tutor */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>

                            {/* Category */}
                            <Skeleton className="h-4 w-24" />

                            {/* Schedule */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-24" />
                            </div>

                            {/* Duration */}
                            <Skeleton className="h-4 w-16" />

                            {/* Status */}
                            <Skeleton className="h-8 w-24 rounded-full" />

                            {/* Payment */}
                            <Skeleton className="h-8 w-24 rounded-full" />

                            {/* Action */}
                            <Skeleton className="h-8 w-24 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-24" />
            </div>

        </div>
    );
}