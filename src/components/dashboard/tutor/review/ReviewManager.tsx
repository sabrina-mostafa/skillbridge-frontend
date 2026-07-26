"use client";

import SectionHeader from "@/components/common/SectionHeader";
import { Review } from "@/types/review.type";


import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { reviewClientService } from "@/services/review/review.client.service";
import ReviewManagerSkeleton from "@/components/skeletons/ReviewManagerSkeleton";
import ReviewFilters from "../../review/ReviewFilters";
import ReviewSummary from "../../review/ReviewSummary";
import ReviewTable from "../../review/ReviewTable";
import ReviewDetailsModal from "../../review/ReviewDetailsModal";
import { USER_ROLES } from "@/constants/user/UserRoles";


export default function ReviewManager() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const [minRating, setMinRating] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 1,
    });
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const reviewRes = await reviewClientService.getMyReviews({
                page,
                limit: 8,
                minRating: minRating
                    ? Number(minRating)
                    : undefined,
                sortBy: sortBy as "createdAt" | "rating",
                sortOrder: sortOrder as "asc" | "desc",
            })

            //  Reviews
            if (reviewRes.error || !reviewRes.data) {
                toast.error(
                    reviewRes.error ?? "Failed to load reviews."
                );
            } else {
                setReviews(reviewRes.data.data);
                setMeta(reviewRes.data.meta);
            }
        } catch {
            toast.error("Failed to load review data.");
        } finally {
            setLoading(false);
        }
    }, [page, minRating, sortBy, sortOrder, startDate, endDate,]);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [fetchData]);

    const summary = useMemo(() => {
        const total = reviews.length;

        const average =
            total === 0
                ? 0
                : reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                ) / total;

        const students = new Set(
            reviews.map((review) => review.studentId)
        ).size;

        const fiveStars = reviews.filter(
            (review) => review.rating === 5
        ).length;

        return {
            total,
            average,
            students,
            fiveStars,
        };
    }, [reviews]);

    if (loading) {
        return <ReviewManagerSkeleton />;
    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <SectionHeader
                title="Student Reviews"
                description="View feedback from your students and gain insights to improve your tutoring experience."
            />

            {/* Summary */}
            <ReviewSummary
                role={USER_ROLES.TUTOR}
                total={summary.total}
                average={summary.average}
                students={summary.students}
                fiveStars={summary.fiveStars}
            />

            {/* Filters */}
            <ReviewFilters
                minRating={minRating}
                sortBy={sortBy}
                sortOrder={sortOrder}
                startDate={startDate}
                endDate={endDate}
                onMinRatingChange={setMinRating}
                onSortByChange={setSortBy}
                onSortOrderChange={setSortOrder}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onClear={() => {
                    setMinRating("");
                    setStartDate(undefined);
                    setEndDate(undefined);
                    setSortBy("createdAt");
                    setSortOrder("desc");
                    setPage(1);
                }}
            />

            {/* Review Table */}
            <ReviewTable
                readOnly
                data={reviews}
                page={page}
                setPage={setPage}
                meta={meta}
                onView={(review) => {
                    setSelectedReview(review);
                    setDetailsOpen(true);
                }}
            />

            {/* Review Details */}
            <ReviewDetailsModal
                role={USER_ROLES.TUTOR}
                review={selectedReview}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
        </div>
    );
}