"use client";

import { Calendar, Clock, GraduationCap } from "lucide-react";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";

import { Booking } from "@/types/booking.types";

type Props = {
    booking: Booking;
    onReview: (booking: Booking) => void;
};

export default function PendingReviewCard({
    booking,
    onReview,
}: Props) {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <UserAvatar
                        name={booking.tutor.user.name}
                        image={booking.tutor.user.image}
                        className="h-12 w-12"
                    />

                    <div>
                        <h3 className="font-semibold">
                            {booking.tutor.user.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {booking.tutor.education}
                        </p>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <GraduationCap className="h-4 w-4" />
                    {booking.category.name}
                </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />

                    {start.toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />

                    {start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                    })}
                    {" - "}
                    {end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                    })}
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">
                    This completed session is waiting for your feedback.
                    Your review helps other students choose the right tutor.
                </p>
            </div>

            <div className="mt-5 flex justify-end">
                <Button
                    className="cursor-pointer"
                    onClick={() => onReview(booking)}
                >
                    Write Review
                </Button>
            </div>
        </div>
    );
}