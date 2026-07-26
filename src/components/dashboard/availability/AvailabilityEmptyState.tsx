"use client";

import { CalendarClock } from "lucide-react";

export default function AvailabilityEmptyState() {
    return (
        <div className="flex h-full min-h-75 flex-col items-center justify-center px-6">
            <div className="rounded-full bg-primary/10 p-5">
                <CalendarClock className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                No availability added
            </h3>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
                Add your available days and time slots so students can
                book sessions with you.
            </p>
        </div>
    );
}