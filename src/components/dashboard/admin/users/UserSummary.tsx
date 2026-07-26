"use client";

import {
    Users,
    GraduationCap,
    UserRound,
    TrendingUp,
} from "lucide-react";
import { SummaryCard } from "../../common/SummaryCard";

type Props = {
    totalUsers: number;
    tutors: number;
    students: number;
    newUsers: number;
};


export default function UserSummary({
    totalUsers,
    tutors,
    students,
    newUsers,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total Users"
                value={totalUsers}
                description="Registered accounts"
                icon={Users}
            />

            <SummaryCard
                title="Tutor Profiles"
                value={tutors}
                description="Active tutors"
                icon={GraduationCap}
            />

            <SummaryCard
                title="Student Profiles"
                value={students}
                description="Active students"
                icon={UserRound}
            />

            <SummaryCard
                title="New Users"
                value={newUsers}
                description="Joined in the last 30 days"
                icon={TrendingUp}
            />
        </div>
    );
}