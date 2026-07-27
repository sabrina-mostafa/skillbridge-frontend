import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-[28rem] max-w-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-3 w-40" />
              </div>

              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border p-6">
        <Skeleton className="mb-4 h-6 w-40" />

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}