import { Button } from "@/components/ui/button";
import { SESSION_STATUS } from "@/constants/booking/BookingSessionStatus";
import { Booking } from "@/types/booking.types";
import { getSessionStatus } from "@/utils/session/sessionStatus.utils";
import { Eye, Star, Pencil } from "lucide-react";

type SessionActionButtonProps = {
    booking: Booking;
    onView: (booking: Booking) => void;
    onReview: (booking: Booking) => void;
};

export default function StudentSessionActionButton({
    booking,
    onView,
    onReview,
}: SessionActionButtonProps) {
    const sessionStatus = getSessionStatus(booking);

    if (sessionStatus === SESSION_STATUS.COMPLETED) {
        const hasReview = !!booking.review;

        return (
            <Button
                size="sm"
                className="cursor-pointer"
                onClick={() => onReview(booking)}
            >
                {hasReview ? (
                    <Pencil className="h-4 w-4" />
                ) : (
                    <Star className="h-4 w-4" />
                )}
                {hasReview ? "Edit Review" : "Write Review"}
            </Button>
        );
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => onView(booking)}
        >
            <Eye className="h-4 w-4" />
            View
        </Button>
    );
}