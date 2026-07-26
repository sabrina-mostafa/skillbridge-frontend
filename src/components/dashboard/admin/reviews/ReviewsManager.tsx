"use client";

import { useCallback, useEffect, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { Analytics } from "@/types/analytics.type";
import { GetAllReviewsQuery, Review } from "@/types/review.type";
import ReviewSummary from "./ReviewSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewsTable from "./ReviewsTable";
import ReviewDetailsModal from "./ReviewDetailsModal";
import DeleteReviewDialog from "./DeleteReviewDialog";



type Props = {
    reviews: Review[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    initialFilters: GetAllReviewsQuery;
};

export default function ReviewsManager({
    reviews,
    analytics,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");

    const debouncedSearch = useDebounce(search, 400);

    const [rating, setRating] = useState(searchParams.get("minRating") ?? "ALL");

    const [sortBy, setSortBy] = useState(() => {
        const sort =
            searchParams.get("sortBy");

        const order =
            searchParams.get("sortOrder");

        if (
            sort === "createdAt" &&
            order === "desc"
        )
            return "newest";

        if (
            sort === "createdAt" &&
            order === "asc"
        )
            return "oldest";

        if (sort === "rating")
            return "rating";

        return "newest";
    });

    const updateQuery = useCallback(
        (
            updates: Record<
                string,
                string | undefined
            >
        ) => {
            const params = new URLSearchParams(searchParams);

            Object.entries(updates).forEach(
                ([key, value]) => {
                    if (!value) {
                        params.delete(key);
                    } else {
                        params.set(key, value);
                    }
                }
            );
            router.push(
                `${pathname}?${params.toString()}`,
                {
                    scroll: false,
                }
            );
        },
        [pathname, router, searchParams,]
    );

    useEffect(() => {
        const current = searchParams.get("searchTerm") ?? "";

        if (current === debouncedSearch)
            return;

        updateQuery({
            searchTerm:
                debouncedSearch || undefined,
            page: "1",
        });
    }, [debouncedSearch, searchParams, updateQuery,]);


    return (
        <div className="space-y-6">
            <SectionHeader
                title="Review Management"
                description="Manage all reviews submitted across the platform."
            />

            <ReviewSummary
                totalReviews={analytics?.reviews?.total ?? 0}
                averageRating={analytics?.reviews?.averageRating ?? 0}
                completedBookings={analytics?.bookings?.completed ?? 0}
                activeTutors={analytics?.users?.completedTutorProfiles ?? 0}
            />

            <ReviewFilters
                search={search}
                rating={rating}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onRatingChange={(value) => {
                    setRating(value);

                    updateQuery({
                        minRating:
                            value === "ALL"
                                ? undefined
                                : value,
                        page: "1",
                    });
                }}
                onSortChange={(value) => {
                    setSortBy(value);

                    if (value === "newest") {
                        updateQuery({
                            sortBy:
                                "createdAt",
                            sortOrder:
                                "desc",
                            page: "1",
                        });
                    } else if (
                        value === "oldest"
                    ) {
                        updateQuery({
                            sortBy:
                                "createdAt",
                            sortOrder:
                                "asc",
                            page: "1",
                        });
                    } else {
                        updateQuery({
                            sortBy:
                                "rating",
                            sortOrder:
                                "desc",
                            page: "1",
                        });
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setRating("ALL");
                    setSortBy("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <ReviewsTable
                reviews={reviews}
                onView={(review) => {
                    setSelectedReview(
                        review
                    );
                    setDetailsOpen(true);
                }}
                onDelete={(review) => {
                    setSelectedReview(
                        review
                    );
                    setDeleteOpen(true);
                }}
            />

            <Pagination
                page={meta?.page ?? 1}
                total={meta?.total ?? 0}
                totalPages={
                    meta?.totalPages ?? 1
                }
                limit={meta?.limit ?? 10}
                onPageChange={(page) =>
                    updateQuery({
                        page: String(page),
                    })
                }
                className="max-w-8xl sm:px-6"
            />

            <ReviewDetailsModal
                open={detailsOpen}
                onOpenChange={
                    setDetailsOpen
                }
                review={selectedReview}
            />

            <DeleteReviewDialog
                open={deleteOpen}
                onOpenChange={
                    setDeleteOpen
                }
                review={selectedReview}
            />
        </div>
    );
}