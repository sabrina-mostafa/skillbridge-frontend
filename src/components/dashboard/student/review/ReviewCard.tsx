"use client";

import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";

import ReviewRating from "./ReviewRating";
import { Review } from "@/types/review.type";

type ReviewCardProps = {
    review: Review;

    canManage?: boolean;

    onEdit?: (review: Review) => void;

    onDelete?: (review: Review) => void;
};

export default function ReviewCard({
    review,
    canManage = false,
    onEdit,
    onDelete,
}: ReviewCardProps) {
    return (
        <div className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <UserAvatar
                        name={review.student.user.name}
                        image={review.student.user.image}
                    />

                    <div>
                        <h4 className="font-semibold">
                            {review.student.user.name}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                            {format(
                                new Date(review.createdAt),
                                "MMM d, yyyy"
                            )}
                        </p>
                    </div>
                </div>

                <ReviewRating
                    rating={review.rating}
                    readonly
                    showValue
                />
            </div>

            <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
                {review.comment}
            </p>

            {canManage && (
                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onEdit?.(review)}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onDelete?.(review)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
}