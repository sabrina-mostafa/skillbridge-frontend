"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { toast } from "sonner";
import FormModal from "@/components/common/FormModal";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { BOOKING_STATUS, BookingStatus } from "@/constants/booking/BookingStatus";
import { Booking } from "@/types/booking.types";



type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Booking | null;
    onSuccess?: () => void;
};

const transitions: Record<BookingStatus, BookingStatus[]> = {
    PENDING: [
        BOOKING_STATUS.CONFIRMED,
        BOOKING_STATUS.DECLINED,
        BOOKING_STATUS.CANCELLED,
    ],
    CONFIRMED: [
        BOOKING_STATUS.COMPLETED,
        BOOKING_STATUS.CANCELLED,
    ],
    COMPLETED: [],
    CANCELLED: [],
    DECLINED: [],
};

export default function ChangeBookingStatusDialog({
    open,
    onOpenChange,
    booking,
    onSuccess,
}: Props) {
    const router = useRouter();

    const [status, setStatus] = useState<BookingStatus | "">("");

    const [isPending, startTransition] = useTransition();

    const availableStatuses = useMemo(() => {
        if (!booking) return [];

        return transitions[booking.status];
    }, [booking]);

    if (!booking) return null;

    function handleUpdate() {
        if (!booking) return;

        startTransition(async () => {
            const res =
                await bookingClientService.updateAdminBookingStatus(
                    booking.id,
                    status as BookingStatus
                );

            if (res.error) {
                toast.error(res.error.message);
                return;
            }

            toast.success("Booking updated successfully.");

            onOpenChange(false);

            onSuccess?.();

            router.refresh();
        });
    }

    const isTerminal =
        booking.status === BOOKING_STATUS.COMPLETED ||
        booking.status === BOOKING_STATUS.CANCELLED ||
        booking.status === BOOKING_STATUS.DECLINED;

    return (
        <FormModal
            open={open}
            onOpenChange={(nextOpen) => {
                if (nextOpen) {
                    setStatus("");
                }

                onOpenChange(nextOpen);
            }}
            title="Update Booking Status"
            size="md"
            footer={
                <>
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>

                    <Button
                        className="cursor-pointer"
                        disabled={
                            isPending ||
                            isTerminal ||
                            status === booking.status
                        }
                        onClick={handleUpdate}
                    >
                        {isPending ? "Saving..." : "Update Status"}
                    </Button>
                </>
            }>
            <div className="space-y-6">
                {/* Booking */}
                <div className="rounded-xl border bg-card p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Booking Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Subject
                            </p>
                            <p className="font-medium">
                                {booking.category.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Student
                            </p>
                            <p className="font-medium">
                                {booking.student.user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Tutor
                            </p>
                            <p className="font-medium">
                                {booking.tutor.user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Current Status
                            </p>

                            <div className="mt-1 inline-flex rounded-full border bg-muted px-3 py-1 text-sm font-medium">
                                {booking.status}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="rounded-xl border p-5">
                    <div className="mb-4">
                        <h3 className="font-semibold">
                            Update Status
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Choose the next valid status for this booking.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="rounded-lg border bg-muted px-4 py-2 font-medium">
                            {booking.status}
                        </div>
                        <span className="text-muted-foreground">
                            →
                        </span>
                        <div className="flex-1">
                            <Select
                                value={status}
                                onValueChange={(value) =>
                                    setStatus(value as BookingStatus)
                                }
                                disabled={isTerminal}
                            >
                                <SelectTrigger className="px-4">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    {availableStatuses.map((item) => (
                                        <SelectItem
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Only valid workflow transitions are available.
                    </p>
                </div>

                {isTerminal && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                        <div className="flex gap-3">
                            <Clock3 className="mt-0.5 h-5 w-5 text-yellow-600" />

                            <div>
                                <p className="font-semibold text-yellow-900">
                                    Status Locked
                                </p>

                                <p className="mt-1 text-sm text-yellow-700">
                                    This booking has already reached a final state and can no
                                    longer be modified.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormModal>
    );
}