"use client";

import {
    Users,
    CalendarCheck,
    CalendarClock,
    BookOpen,
} from "lucide-react";
import { SummaryCard } from "../../common/SummaryCard";

type Props = {
    students: number;
    totalSessions: number;
    completedSessions: number;
    activeStudents: number;
};

export default function StudentSummary({
    students,
    totalSessions,
    completedSessions,
    activeStudents,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Students"
                value={students}
                description="Students you've taught"
                icon={Users}
            />

            <SummaryCard
                title="Total Sessions"
                value={totalSessions}
                description="Sessions booked with students"
                icon={BookOpen}
            />

            <SummaryCard
                title="Completed Sessions"
                value={completedSessions}
                description="Successfully completed lessons"
                icon={CalendarCheck}
            />

            <SummaryCard
                title="Active Students"
                value={activeStudents}
                description="Students with upcoming sessions"
                icon={CalendarClock}
            />
        </div>
    );
}