"use client";

import { Booking } from "@/types/booking.types";
import PendingReviewCard from "./PendingReviewCard";

type Props = {
  bookings: Booking[];
  onReview: (booking: Booking) => void;
};

export default function PendingReviewList({
  bookings,
  onReview,
}: Props) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
        <h3 className="text-lg font-semibold">
          You&apos;re all caught up 🎉
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no completed sessions waiting for a review.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-125 overflow-y-auto pr-2">
      <div className="space-y-5">
        {bookings.map((booking) => (
          <PendingReviewCard
            key={booking.id}
            booking={booking}
            onReview={onReview}
          />
        ))}
      </div>
    </div>
  );
}