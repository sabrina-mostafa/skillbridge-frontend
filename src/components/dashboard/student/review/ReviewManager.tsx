"use client";

import SectionHeader from "@/components/common/SectionHeader";
import { Booking } from "@/types/booking.types";
import { Review } from "@/types/review.type";
import ReviewSummary from "../../review/ReviewSummary";
import PendingReviewList from "./PendingReviewList";
import ReviewModal from "./ReviewModal";
import ReviewTable from "../../review/ReviewTable";
import ReviewFilters from "../../review/ReviewFilters";
import ReviewDetailsModal from "../../review/ReviewDetailsModal";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { reviewClientService } from "@/services/review/review.client.service";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { format } from "date-fns";
import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import DeleteReviewModal from "./DeleteReviewModal";
import ReviewManagerSkeleton from "@/components/skeletons/ReviewManagerSkeleton";
import { USER_ROLES } from "@/constants/user/UserRoles";


export default function ReviewManager() {
    const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
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

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const [reviewRes, bookingRes] = await Promise.all([
                reviewClientService.getMyReviews({
                    page,
                    limit: 8,
                    minRating: minRating
                        ? Number(minRating)
                        : undefined,
                    sortBy: sortBy as "createdAt" | "rating",
                    sortOrder: sortOrder as "asc" | "desc",
                }),

                bookingClientService.getMine({
                    page: 1,
                    limit: 100,
                    status: BOOKING_STATUS.COMPLETED,
                    startDate: startDate
                        ? format(startDate, "yyyy-MM-dd")
                        : undefined,
                    endDate: endDate
                        ? format(endDate, "yyyy-MM-dd")
                        : undefined,
                }),
            ]);

            //  Reviews
            if (reviewRes.error || !reviewRes.data) {
                toast.error(
                    reviewRes.error ?? "Failed to load reviews."
                );
            } else {
                setReviews(reviewRes.data.data);
                setMeta(reviewRes.data.meta);
            }

            // Pending reviews (Completed bookings without reviews)
            if (bookingRes.error || !bookingRes.data) {
                toast.error(
                    bookingRes.error ?? "Failed to load completed sessions."
                );
            } else {
                const pending = bookingRes.data.data.filter(
                    (booking) => !booking.review
                );
                setPendingBookings(pending);
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

        const tutors = new Set(
            reviews.map((review) => review.tutorId)
        ).size;

        return {
            total,
            average,
            tutors,
            pending: pendingBookings.length,
        };
    }, [reviews, pendingBookings]);

    if (loading) {
        return <ReviewManagerSkeleton />;
    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <SectionHeader
                title="My Reviews"
                description="Manage your tutor reviews and help future students make informed decisions."
            />

            {/* Summary */}
            <ReviewSummary
                role={USER_ROLES.STUDENT}
                total={summary.total}
                average={summary.average}
                pending={summary.pending}
                tutors={summary.tutors}
            />

            {/* Pending Reviews */}
            <PendingReviewList
                bookings={pendingBookings}
                onReview={(booking) => {
                    setSelectedBooking(booking);
                    setReviewModalOpen(true);
                }}
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
                data={reviews}
                page={page}
                setPage={setPage}
                meta={meta}
                onView={(review) => {
                    setSelectedReview(review);
                    setDetailsOpen(true);
                }}
                onEdit={(review) => {
                    setSelectedBooking({
                        ...review.booking,
                        tutor: review.tutor,
                        review,
                    } as Booking);
                    setReviewModalOpen(true);
                }}
                onDelete={(review) => {
                    setSelectedReview(review);
                    setDeleteOpen(true);
                }}
            />

            {/* Edit Review Modal */}
            <ReviewModal
                booking={selectedBooking}
                open={reviewModalOpen}
                onOpenChange={setReviewModalOpen}
            />

            {/* Review Details */}
            <ReviewDetailsModal
                role={USER_ROLES.STUDENT}
                review={selectedReview}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />

            {/* Delete Review */}
            <DeleteReviewModal
                review={selectedReview}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onSuccess={fetchData}
            />

        </div>
    );
}