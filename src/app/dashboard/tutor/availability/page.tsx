import AvailabilityManager from "@/components/dashboard/availability/AvailabilityManager";


export default async function AvailabilityPage() {
  return (
    <div className="mx-auto w-full space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Availability
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your weekly teaching schedule and time slots.
        </p>
      </div>

      <AvailabilityManager />
    </div>
  );
}