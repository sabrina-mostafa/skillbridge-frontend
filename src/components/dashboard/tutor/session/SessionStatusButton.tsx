"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Booking } from "@/types/booking.types";
import SessionStatusModal from "./SessionStatusModal";

type Props = {
    booking: Booking;
    onSuccess: () => void;
};

export default function SessionStatusButton({
    booking,
    onSuccess,
}: Props) {
    const [open, setOpen] = useState(false);

    const disabled =
        booking.status === "COMPLETED" ||
        booking.status === "DECLINED" ||
        booking.status === "CANCELLED";

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

            <SessionStatusModal
                booking={booking}
                open={open}
                onOpenChange={setOpen}
                onSuccess={onSuccess}
            />
        </>
    );
}