"use client";

import {
    Star,
    MessageSquare,
    GraduationCap,
    CircleCheckBig,
} from "lucide-react";
import { SummaryCard } from "../../common/SummaryCard";


type Props = {
    totalReviews: number;
    averageRating: number;
    completedBookings: number;
    activeTutors: number;
};

export default function ReviewSummary({
    totalReviews,
    averageRating,
    completedBookings,
    activeTutors,
}: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total Reviews"
                value={totalReviews ?? 0}
                description="Student feedback"
                icon={MessageSquare}
            />

            <SummaryCard
                title="Average Rating"
                value={Number((averageRating ?? 0).toFixed(1))}
                description="Across all tutors"
                icon={Star}
            />

            <SummaryCard
                title="Completed Bookings"
                value={completedBookings ?? 0}
                description="Eligible for reviews"
                icon={CircleCheckBig}
            />

            <SummaryCard
                title="Active Tutors"
                value={activeTutors ?? 0}
                description="Available tutors"
                icon={GraduationCap}
            />
        </div>
    );
}