"use client";

import {
    UserRound,
    ShieldCheck,
    TrendingUp,
    BookOpen,
} from "lucide-react";

import { SummaryCard } from "../../common/SummaryCard";

type Props = {
    totalStudents: number;
    studentProfiles: number;
    newStudents: number;
    totalBookings: number;
};

export default function StudentSummary({
    totalStudents,
    studentProfiles,
    newStudents,
    totalBookings,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Active Students"
                value={totalStudents}
                description="Accounts currently active"
                icon={UserRound}
            />

            <SummaryCard
                title="Student Profiles"
                value={studentProfiles}
                description="Completed student profiles"
                icon={ShieldCheck}
            />

            <SummaryCard
                title="New Students"
                value={newStudents}
                description="Joined in the last 30 days"
                icon={TrendingUp}
            />

            <SummaryCard
                title="Bookings Made"
                value={totalBookings}
                description="Sessions booked by students"
                icon={BookOpen}
            />
        </div>
    );
}