"use client";

import {
    Award,
    GraduationCap,
    ShieldCheck,
    StarHalf,
} from "lucide-react";

import { SummaryCard } from "../../common/SummaryCard";

type Props = {
    totalTutors: number;
    activeTutors: number;
    featuredTutors: number;
    averageRating: number;
};

export default function TutorSummary({
    totalTutors,
    activeTutors,
    featuredTutors,
    averageRating,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Tutor Profiles"
                value={totalTutors}
                description="Completed tutor profiles"
                icon={GraduationCap}
            />

            <SummaryCard
                title="Active Tutors"
                value={activeTutors}
                description="Accounts currently active"
                icon={ShieldCheck}
            />

            <SummaryCard
                title="Featured Tutors"
                value={featuredTutors}
                description="Promoted on homepage"
                icon={Award}
            />

            <SummaryCard
                title="Average Rating"
                value={Number(averageRating.toFixed(1))}
                description="Across all tutor reviews"
                icon={StarHalf}
            />
        </div>
    );
}