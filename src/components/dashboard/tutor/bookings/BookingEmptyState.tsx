"use client";

import { CalendarDays } from "lucide-react";

export default function BookingEmptyState() {
    return (
        <div className="flex h-full min-h-75 flex-col items-center justify-center px-6">
            <div className="rounded-full bg-primary/10 p-5">
                <CalendarDays className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                No bookings yet
            </h3>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
                Your upcoming and past tutoring bookings will appear here
                once sessions are scheduled.
            </p>
        </div>
    );
}