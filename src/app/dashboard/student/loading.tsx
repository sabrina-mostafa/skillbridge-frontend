import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* DashboardHeaderSection */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      {/* StatsGrid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-3 w-36" />
              </div>

              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>

            <div className="mt-8 border-t pt-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ActionGrid */}
      <div className="rounded-xl border p-6">
        <Skeleton className="mb-5 h-6 w-40" />

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}