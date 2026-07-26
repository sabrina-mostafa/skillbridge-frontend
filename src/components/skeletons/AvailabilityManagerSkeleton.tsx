import { Skeleton } from "@/components/ui/skeleton";


export default function AvailabilityManagerSkeleton() {
  return (
    <div className="space-y-10 w-full flex flex-col">
      {/* Header Skeleton */}
      <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl border bg-card shadow-sm p-4">
        <div className="space-y-3">
          {/* table header */}
          <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
          </div>

          {/* rows */}
          {Array.from({ length: 5 }).map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-6 gap-4 py-3"
            >
              {Array.from({ length: 6 }).map((_, col) => (
                <Skeleton key={col} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}