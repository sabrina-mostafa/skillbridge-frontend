"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Booking } from "@/types/booking.types";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import ReviewRating from "./ReviewRating";
import { reviewClientService } from "@/services/review/review.client.service";
import { Star, MessageSquareText } from "lucide-react";


const reviewSchema = z.object({
    rating: z
        .number()
        .min(1, "Please select a rating.")
        .max(5),

    comment: z
        .string()
        .trim()
        .min(10, "Please write at least 10 characters.")
        .max(1000),
});

type ReviewFormProps = {
    booking: Booking;
    onSuccess?: () => void;
};

export default function ReviewForm({
    booking,
    onSuccess,
}: ReviewFormProps) {
    const review = booking.review;
    const isEditing = Boolean(review);

    const form = useForm({
        defaultValues: {
            rating: booking?.review?.rating ?? 0,
            comment: booking?.review?.comment ?? "",
        },

        validators: {
            onSubmit: reviewSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                let res;

                if (isEditing) {
                    res = await reviewClientService.updateReview(
                        review!.id,
                        {
                            rating: value.rating,
                            comment: value.comment,
                        }
                    );
                } else {
                    res = await reviewClientService.createReview({
                        bookingId: booking.id,
                        rating: value.rating,
                        comment: value.comment,
                    });
                }

                if (res.error) {
                    toast.error(res.error);
                    return;
                }

                toast.success(
                    isEditing
                        ? "Review updated successfully."
                        : "Review submitted successfully."
                );

                onSuccess?.();
            } catch {
                toast.error("Something went wrong.");
            }
        },
    });

    return (
        <form
            id="review-form"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-8"
        >
            <FieldGroup>
                {/* Rating */}
                <div className="rounded-xl border bg-muted/20 p-6">
                    <form.Field name="rating">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel className="flex items-center gap-2 text-base font-semibold">
                                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        Overall Rating
                                    </FieldLabel>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Rate your overall learning experience.
                                    </p>

                                    <div className="mt-5">
                                        <ReviewRating
                                            rating={field.state.value}
                                            onChange={field.handleChange}
                                        />
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            className="mt-3"
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                </div>

                {/* Comment */}
                <div className="rounded-xl border bg-muted/20 p-6">
                    <form.Field name="comment">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel className="flex items-center gap-2 text-base font-semibold">
                                            <MessageSquareText className="h-4 w-4" />
                                            Share your experience
                                        </FieldLabel>

                                        <span className="text-xs text-muted-foreground">
                                            {field.state.value.length}/1000
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Your feedback helps future students choose the right tutor.
                                    </p>

                                    <Textarea
                                        className="mt-5 min-h-40 resize-none rounded-lg"
                                        placeholder="Describe what you liked about the tutor, the teaching style, communication, and overall experience..."
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        aria-invalid={isInvalid}
                                    />

                                    {isInvalid && (
                                        <FieldError
                                            className="mt-3"
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                </div>
            </FieldGroup>

            <div className="flex items-center justify-between border-t pt-5">
                <p className="text-sm text-muted-foreground">
                    Reviews are public and help other students.
                </p>

                <Button
                    type="submit"
                    form="review-form"
                    className="min-w-30 min-h-10 cursor-pointer"
                >
                    {isEditing ? "Update Review" : "Submit Review"}
                </Button>
            </div>
        </form>
    );
}