"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking.types";
import { BOOKING_STATUS } from "@/constants/booking/BookingStatus";
import StudentBookingStatusModal from "./StudentBookingStatusModal";


type Props = {
    booking: Booking;
    onSuccess: () => void;
};

export default function StudentBookingStatusButton({
    booking,
    onSuccess,
}: Props) {
    const [open, setOpen] = useState(false);

    const disabled =
        booking.status === BOOKING_STATUS.COMPLETED ||
        booking.status === BOOKING_STATUS.DECLINED ||
        booking.status === BOOKING_STATUS.CANCELLED;

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                disabled={disabled}
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <PencilLine className="mr-2 h-4 w-4" />
                Update
            </Button>

            <StudentBookingStatusModal
                booking={booking}
                open={open}
                onOpenChange={setOpen}
                onSuccess={onSuccess}
            />
        </>
    );
}