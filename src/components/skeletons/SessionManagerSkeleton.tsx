import { Skeleton } from "@/components/ui/skeleton";

export default function SessionManagerSkeleton() {
    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-2 border rounded-2xl p-4">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-96 max-w-full" />
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-card p-5 space-y-4"
                    >
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-9 w-14" />
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="rounded-xl border bg-card p-5">
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
            <div className="rounded-xl border">
                <div className="border-b p-4">
                    <Skeleton className="h-6 w-36" />
                </div>

                <div className="divide-y">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 items-center gap-4 p-4"
                        >
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="ml-auto h-9 w-20" />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t p-4">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}