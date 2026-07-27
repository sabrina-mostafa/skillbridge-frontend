"use client";

import FormModal from "@/components/common/FormModal";
import { Booking } from "@/types/booking.types";
import ReviewForm from "./ReviewForm";


type ReviewModalProps = {
    booking: Booking | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function ReviewModal({
    booking,
    open,
    onOpenChange,
}: ReviewModalProps) {

    if (!booking) return null;

    const review = booking.review;
    const isEditing = Boolean(review);

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title={
                isEditing
                    ? "Edit Review"
                    : "Review Your Tutor"
            }
            size="lg"
        >
            <ReviewForm
                booking={booking}
                onSuccess={() => onOpenChange(false)}
            />
        </FormModal>
    );
}