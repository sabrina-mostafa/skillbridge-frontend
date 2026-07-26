"use client";

import {
    Users,
    GraduationCap,
    BookOpen,
    CalendarDays,
    Star,
    Mail,
} from "lucide-react";
import { Analytics } from "@/types/analytics.type";
import { SummaryCard } from "../../common/SummaryCard";


type Props = {
    analytics: Analytics;
};

export default function AnalyticsOverview({
    analytics,
}: Props) {
    const overview = analytics?.overview;

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <SummaryCard
                title="Users"
                value={overview?.totalUsers ?? 0}
                description="Registered accounts"
                icon={Users}
            />

            <SummaryCard
                title="Tutors"
                value={overview?.activeTutors ?? 0}
                description="Active tutors"
                icon={GraduationCap}
            />

            <SummaryCard
                title="Categories"
                value={overview?.totalCategories ?? 0}
                description="Available subjects"
                icon={BookOpen}
            />

            <SummaryCard
                title="Bookings"
                value={overview?.totalBookings ?? 0}
                description="Total sessions"
                icon={CalendarDays}
            />

            <SummaryCard
                title="Reviews"
                value={overview?.totalReviews ?? 0}
                description="Student feedback"
                icon={Star}
            />

            <SummaryCard
                title="Messages"
                value={overview?.totalMessages ?? 0}
                description="Inbox inquiries"
                icon={Mail}
            />
        </div>
    );
}