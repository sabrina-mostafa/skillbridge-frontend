"use client";

import {
    GraduationCap,
    BookOpen,
    CalendarCheck,
    CalendarClock,
} from "lucide-react";

type Props = {
    tutors: number;
    totalSessions: number;
    completedSessions: number;
    activeTutors: number;
};

type CardProps = {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
};

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
}: CardProps) {
    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight">
                        {value}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
            </div>
        </div>
    );
}

export default function TutorSummary({
    tutors,
    totalSessions,
    completedSessions,
    activeTutors,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Tutors"
                value={tutors}
                description="Tutors you've learned from"
                icon={GraduationCap}
            />

            <SummaryCard
                title="Total Sessions"
                value={totalSessions}
                description="Sessions booked with tutors"
                icon={BookOpen}
            />

            <SummaryCard
                title="Completed Sessions"
                value={completedSessions}
                description="Lessons you've completed"
                icon={CalendarCheck}
            />

            <SummaryCard
                title="Active Tutors"
                value={activeTutors}
                description="Tutors with upcoming sessions"
                icon={CalendarClock}
            />
        </div>
    );
}