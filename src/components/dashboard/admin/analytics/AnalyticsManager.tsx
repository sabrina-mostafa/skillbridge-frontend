"use client";

import {
    Activity,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    MessageSquare,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";

import SectionHeader from "@/components/common/SectionHeader";
import { Analytics } from "@/types/analytics.type";

import AnalyticsOverview from "./AnalyticsOverview";

type Props = {
    analytics: Analytics;
};

export default function AnalyticsManager({
    analytics,
}: Props) {
    return (
        <div className="space-y-8">
            <SectionHeader
                title="Platform Analytics"
                description="Track business performance, user engagement and operational health."
            />

            {/* Executive Overview */}
            <div className="overflow-hidden rounded-3xl border bg-card">
                <div className="border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Activity className="h-3.5 w-3.5" />
                                Executive Dashboard
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight">
                                Platform Performance Overview
                            </h2>

                            <p className="mt-3 text-muted-foreground">
                                Monitor platform growth, booking activity,
                                tutor engagement and operational KPIs from one
                                centralized dashboard.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            <p className="text-sm text-muted-foreground">
                                Overall Platform Health
                            </p>

                            <div className="mt-2 flex items-end gap-2">
                                <span className="text-5xl font-bold">
                                    {analytics?.kpis?.completionRate ?? 0}%
                                </span>

                                <TrendingUp className="mb-2 h-6 w-6 text-green-600" />
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Booking Completion Rate
                            </p>
                        </div>
                    </div>
                </div>

                {/* KPI Strip */}
                <div className="grid divide-y md:grid-cols-4 md:divide-x md:divide-y-0">
                    <div className="p-6">
                        <Users className="mb-3 h-7 w-7 text-primary" />

                        <p className="text-3xl font-bold">
                            {analytics?.overview?.totalUsers ?? 0}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Total Users
                        </p>
                    </div>

                    <div className="p-6">
                        <CalendarDays className="mb-3 h-7 w-7 text-primary" />

                        <p className="text-3xl font-bold">
                            {analytics?.overview?.totalBookings ?? 0}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Total Bookings
                        </p>
                    </div>

                    <div className="p-6">
                        <Star className="mb-3 h-7 w-7 text-yellow-500" />

                        <p className="text-3xl font-bold">
                            {analytics?.reviews?.averageRating ?? 0}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Average Rating
                        </p>
                    </div>

                    <div className="p-6">
                        <MessageSquare className="mb-3 h-7 w-7 text-primary" />

                        <p className="text-3xl font-bold">
                            {analytics?.contacts?.total ?? 0}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Contact Messages
                        </p>
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="grid gap-6 xl:grid-cols-3">
                {/* Growth */}
                <div className="rounded-2xl border bg-card p-6 xl:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Growth Summary
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                New users acquired in the last 30 days.
                            </p>
                        </div>

                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-3">
                        <div>
                            <p className="text-4xl font-bold">
                                {analytics?.users?.last30DaysUsers ?? 0}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                New Users
                            </p>
                        </div>

                        <div>
                            <p className="text-4xl font-bold">
                                {analytics?.users?.last30DaysTutors ?? 0}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                New Tutors
                            </p>
                        </div>

                        <div>
                            <p className="text-4xl font-bold">
                                {analytics?.users?.last30DaysStudents ?? 0}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                New Students
                            </p>
                        </div>
                    </div>
                </div>

                {/* KPI */}
                <div className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />

                        <div>
                            <h3 className="font-semibold">
                                Completion Rate
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Successful sessions
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-6xl font-bold">
                            {analytics?.kpis?.completionRate ?? 0}%
                        </p>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Cancellation Rate:
                        </p>

                        <p className="text-xl font-semibold text-destructive">
                            {analytics?.kpis?.cancellationRate ?? 0}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Operational Snapshot */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-primary" />

                        <h3 className="font-semibold">
                            Platform Snapshot
                        </h3>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Categories
                            </span>

                            <span className="font-semibold">
                                {analytics?.categories?.total}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Featured Tutors
                            </span>

                            <span className="font-semibold">
                                {analytics?.overview?.featuredTutors}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Active Tutors
                            </span>

                            <span className="font-semibold">
                                {analytics?.overview?.activeTutors}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Active Students
                            </span>

                            <span className="font-semibold">
                                {analytics?.overview?.activeStudents}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">
                            Booking Status
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Current booking distribution.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between">
                            <span>Pending</span>
                            <span className="font-semibold">
                                {analytics?.bookings?.pending}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Confirmed</span>
                            <span className="font-semibold">
                                {analytics?.bookings?.confirmed}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Completed</span>
                            <span className="font-semibold">
                                {analytics?.bookings?.completed}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Cancelled</span>
                            <span className="font-semibold">
                                {analytics?.bookings?.cancelled}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed analytics */}
            <AnalyticsOverview analytics={analytics} />
        </div>
    );
}