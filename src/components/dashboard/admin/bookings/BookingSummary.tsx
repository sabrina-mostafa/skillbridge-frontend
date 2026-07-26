"use client";

import {
    CalendarCheck,
    Clock3,
    BadgeCheck,
    CalendarCheck2,
} from "lucide-react";
import { SummaryCard } from "../../common/SummaryCard";


type Props = {
    totalBookings: number;
    pending: number;
    confirmed: number;
    completed: number;
};

export default function BookingSummary({
    totalBookings,
    pending,
    confirmed,
    completed,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total Bookings"
                value={totalBookings}
                description="All bookings"
                icon={CalendarCheck}
            />

            <SummaryCard
                title="Pending"
                value={pending}
                description="Awaiting tutor response"
                icon={Clock3}
            />

            <SummaryCard
                title="Confirmed"
                value={confirmed}
                description="Upcoming sessions"
                icon={CalendarCheck2}
            />

            <SummaryCard
                title="Completed"
                value={completed}
                description="Finished sessions"
                icon={BadgeCheck}
            />
        </div>
    );
}