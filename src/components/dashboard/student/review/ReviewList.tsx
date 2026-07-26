"use client";

import EmptyState from "@/components/common/EmptyState";
import { MessageSquareText } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/review.type";

type ReviewListProps = {
    reviews: Review[];

    canManage?: boolean;

    onEdit?: (review: Review) => void;

    onDelete?: (review: Review) => void;
};

export default function ReviewList({
    reviews,
    canManage = false,
    onEdit,
    onDelete,
}: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <EmptyState
                icon={
                    <MessageSquareText className="h-8 w-8 text-muted-foreground" />
                }
                title="No reviews yet"
                description="This tutor hasn't received any reviews yet."
                className="min-h-[250px]"
            />
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    canManage={canManage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}