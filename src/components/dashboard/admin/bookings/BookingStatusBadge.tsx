"use client";

import { cn } from "@/lib/utils";
import { BookingStatus } from "@/constants/booking/BookingStatus";

type Props = {
    status: BookingStatus | string;
};

const styles: Record<
    string,
    {
        label: string;
        className: string;
    }
> = {
    PENDING: {
        label: "Pending",
        className:
            "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },

    CONFIRMED: {
        label: "Confirmed",
        className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },

    COMPLETED: {
        label: "Completed",
        className:
            "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },

    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    },

    DECLINED: {
        label: "Declined",
        className:
            "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },
};

export default function BookingStatusBadge({
    status,
}: Props) {
    const config = styles[status] ?? {
        label: status,
        className:
            "bg-muted text-muted-foreground",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                config.className
            )}
        >
            {config.label}
        </span>
    );
}