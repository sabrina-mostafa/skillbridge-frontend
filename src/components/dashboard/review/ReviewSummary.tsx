"use client";

import { USER_ROLES, UserRoles } from "@/constants/user/UserRoles";
import {
    Star,
    StarHalf,
    NotebookPen,
    GraduationCap,
    Users,
} from "lucide-react";

type ReviewSummaryProps = {
    role: Exclude<UserRoles, typeof USER_ROLES.ADMIN>;
    total: number;
    average: number;
    // Student
    pending?: number;
    tutors?: number;
    // Tutor
    students?: number;
    fiveStars?: number;
};

type SummaryCardProps = {
    title: string;
    value: string | number;
    description: string;
    icon: React.ElementType;
};

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
}: SummaryCardProps) {
    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                        {value}
                    </h3>

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

export default function ReviewSummary({
    role,
    total,
    average,
    pending = 0,
    tutors = 0,
    students = 0,
    fiveStars = 0,
}: ReviewSummaryProps) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total Reviews"
                value={total}
                description={
                    role === USER_ROLES.STUDENT
                        ? "Reviews you've submitted"
                        : "Reviews you've received"
                }
                icon={Star}
            />

            <SummaryCard
                title="Average Rating"
                value={average.toFixed(1)}
                description={
                    role === USER_ROLES.STUDENT
                        ? "Average rating you've given"
                        : "Average rating from students"
                }
                icon={StarHalf}
            />

            {role === USER_ROLES.STUDENT ? (
                <>
                    <SummaryCard
                        title="Pending Reviews"
                        value={pending}
                        description="Completed sessions awaiting feedback"
                        icon={NotebookPen}
                    />

                    <SummaryCard
                        title="Tutors Reviewed"
                        value={tutors}
                        description="Unique tutors you've reviewed"
                        icon={GraduationCap}
                    />
                </>
            ) : (
                <>
                    <SummaryCard
                        title="Students"
                        value={students}
                        description="Students who reviewed you"
                        icon={Users}
                    />

                    <SummaryCard
                        title="5-Star Reviews"
                        value={fiveStars}
                        description="Outstanding ratings received"
                        icon={Star}
                    />
                </>
            )}
        </div>
    );
}