"use client";

import { Star } from "lucide-react";

export default function ReviewEmptyState() {
    return (
        <div className="flex h-full min-h-75 flex-col items-center justify-center px-6">
            <div className="rounded-full bg-primary/10 p-5">
                <Star className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                No reviews yet
            </h3>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
                Reviews from completed tutoring sessions will appear here
                once students share their feedback.
            </p>
        </div>
    );
}