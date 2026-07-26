"use client";

import { GraduationCap } from "lucide-react";

export default function TutorEmptyState() {
    return (
        <div className="flex h-full min-h-75 flex-col items-center justify-center px-6">

            <div className="rounded-full bg-primary/10 p-5">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                No tutors yet
            </h3>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
                Tutors you&apos;ve booked or completed learning sessions with
                will appear here.
            </p>

        </div>
    );
}