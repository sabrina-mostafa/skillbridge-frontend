"use client";

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import {
    Calendar,
    Clock,
    GraduationCap,
    UserRound,
    Loader2,
} from "lucide-react";

import FormModal from "@/components/common/FormModal";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Booking } from "@/types/booking.types";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { cn } from "@/lib/utils";
import { BOOKING_STATUS, TutorBookingStatus } from "@/constants/booking/BookingStatus";

type Props = {
    booking: Booking;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
};

const schema = z.object({
    status: z.string().min(1, "Please select a status"),
});

export default function BookingStatusModal({
    booking,
    open,
    onOpenChange,
    onSuccess,
}: Props) {

    const availableStatuses = useMemo(() => {
        switch (booking.status) {
            case BOOKING_STATUS.PENDING:
                return [
                    {
                        value: BOOKING_STATUS.CONFIRMED,
                        label: "Confirm Session",
                    },
                    {
                        value: BOOKING_STATUS.DECLINED,
                        label: "Decline Session",
                    },
                ];

            case BOOKING_STATUS.CONFIRMED:
                return [
                    {
                        value: BOOKING_STATUS.COMPLETED,
                        label: "Mark as Completed",
                    },
                ];

            default:
                return [];
        }
    }, [booking.status]);

    const form = useForm({
        defaultValues: {
            status: "",
        },
        validators: {
            onSubmit: schema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading(
                "Updating session..."
            );

            const result = await bookingClientService.updateTutorBookingStatus(
                booking.id,
                value.status as TutorBookingStatus
            );

            if (result.error) {
                toast.error(result.error.message, { id: toastId, });
                return;
            }
            toast.success("Session updated successfully", { id: toastId, });

            onOpenChange(false);
            onSuccess();
        },
    });

    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    const duration =
        (end.getTime() - start.getTime()) /
        (1000 * 60);

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Update Session Status"
            size="md"
        >
            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                {/* Booking Summary */}
                <div className="grid sm:grid-cols-2 rounded-2xl border bg-card p-5 space-y-5">
                    <div className="flex items-center gap-3">
                        <UserRound className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Student
                            </p>
                            <p className="font-medium">
                                {booking.student.user.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Subject
                            </p>
                            <p className="font-medium">
                                {booking.category.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Date
                            </p>
                            <p className="font-medium">
                                {start.toLocaleDateString(undefined, {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Time
                            </p>
                            <p className="font-medium">
                                {start.toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    timeZone: "UTC",
                                })}
                                {" - "}
                                {end.toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    timeZone: "UTC",
                                })}
                                {" • "}
                                {duration} mins
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current Status */}
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Current Status
                    </p>
                    <div
                        className={cn(
                            "inline-flex mt-2 rounded-full px-3 py-1 text-sm font-medium",

                            booking.status === "PENDING" &&
                            "bg-yellow-100 text-yellow-700",

                            booking.status === "CONFIRMED" &&
                            "bg-blue-100 text-blue-700",

                            booking.status === "DECLINED" &&
                            "bg-red-100 text-red-700",

                            booking.status === "COMPLETED" &&
                            "bg-green-100 text-green-700"
                        )}
                    >
                        {booking.status}
                    </div>
                </div>

                {/* Form */}
                {availableStatuses.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
                        This session can no longer be updated.
                    </div>
                ) : (
                    <form.Field name="status">
                        {(field) => (
                            <div className="space-y-2">

                                <label className="font-medium">
                                    New Status
                                </label>

                                <Select
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                >
                                    <SelectTrigger className="h-11 py-4 mt-2 w-full cursor-pointer">
                                        <SelectValue placeholder="Select new status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {availableStatuses.map((status) => (
                                            <SelectItem
                                                key={status.value}
                                                value={status.value}
                                                className="cursor-pointer p-2"
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {field.state.meta.errors.length >
                                    0 && (
                                        <p className="text-sm text-destructive">
                                            {
                                                field.state.meta
                                                    .errors[0]
                                                    ?.message
                                            }
                                        </p>
                                    )}
                            </div>
                        )}
                    </form.Field>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    {availableStatuses.length > 0 && (
                        <form.Subscribe
                            selector={(state) => ({
                                isSubmitting:
                                    state.isSubmitting,
                            })}
                        >
                            {({ isSubmitting }) => (
                                <Button
                                    type="submit"
                                    className="cursor-pointer min-w-36"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Status"
                                    )}
                                </Button>
                            )}
                        </form.Subscribe>
                    )}
                </div>
            </form>
        </FormModal>
    );
}