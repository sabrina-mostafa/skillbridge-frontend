"use client";

import { useEffect, useState } from "react";
import { Loader2, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { AvailableDate } from "@/types/availability.type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buildCalendar } from "@/utils/booking/bookingCalendar.utils";



type Props = {
    tutorId: string;
    selectedDate?: string;
    onNext: (date: string) => void;
}


export default function BookingDateStep({
    tutorId,
    selectedDate,
    onNext,
}: Props) {
    const [dates, setDates] = useState<AvailableDate[]>([]);
    const [loading, setLoading] = useState(false);

    const weeks = buildCalendar(dates);
    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];
    const calendarTitle = (() => {
        if (!dates.length) return "";

        const first = new Date(dates[0].date);
        const last = new Date(dates[dates.length - 1].date);

        const firstMonth = first.toLocaleDateString(undefined, {
            month: "long",
        });

        const lastMonth = last.toLocaleDateString(undefined, {
            month: "long",
        });

        const firstYear = first.getFullYear();
        const lastYear = last.getFullYear();

        if (firstMonth === lastMonth && firstYear === lastYear) {
            return `${firstMonth} ${firstYear}`;
        }

        if (firstYear === lastYear) {
            return `${firstMonth} – ${lastMonth} ${firstYear}`;
        }

        return `${firstMonth} ${firstYear} – ${lastMonth} ${lastYear}`;
    })();

    useEffect(() => {
        const fetchDates = async () => {
            setLoading(true);

            const res = await bookingClientService.getAvailableDates(
                tutorId
            );

            if (!res.error && res.data) {
                setDates(res.data.dates);
            }
            setLoading(false);
        };

        fetchDates();
    }, [open, tutorId]);

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    if (!dates.length) {
        return (
            <div className="border rounded-xl p-6 text-center text-muted-foreground">
                No available dates found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                    Choose a date
                </h3>
                <p className="text-sm text-muted-foreground">
                    Available dates for the next 30 days.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-2 sm:p-5">
                <div
                    className="rounded-2xl border bg-gradient-to-r
        from-primary/10 via-primary/5 to-transparent p-3 sm:p-5 mb-6"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="h-12 w-12 min-w-12 rounded-xl
                bg-primary/10 flex items-center justify-center"
                        >
                            <CalendarDays className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">
                                {calendarTitle}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pick a date to see available time slots.
                            </p>
                        </div>
                    </div>
                </div>

                {/* weekday */}
                <div
                    className="grid grid-cols-7 rounded-xl
        bg-muted/40 py-2 mb-4"
                >
                    {weekDays.map(day => (
                        <div
                            key={day}
                            className="text-center text-xs font-semibold
                uppercase tracking-widest text-muted-foreground"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* weeks */}
                <div className="space-y-2">

                    {weeks.map((week, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-7 gap-2"
                        >
                            {week.map((date, i) => {
                                if (!date) {
                                    return (
                                        <div
                                            key={i}
                                            className="aspect-square"
                                        />
                                    );
                                }
                                const disabled =
                                    date.status === "FULL" ||
                                    date.status === "UNAVAILABLE";

                                return (
                                    <TooltipProvider key={date.date}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    disabled={disabled}
                                                    onClick={() => onNext(date.date)}
                                                    className={cn(
                                                        `relative sm:h-18 rounded-2xl border
        bg-background transition-all duration-200 flex flex-col justify-center
        items-center overflow-hidden`,
                                                        !disabled &&
                                                        `hover:-translate-y-1
            hover:border-primary
            hover:shadow-lg cursor-pointer
        `,
                                                        disabled &&
                                                        "opacity-30 cursor-not-allowed",

                                                        selectedDate === date.date &&
                                                        `bg-primary
            text-primary-foreground border-primary
            shadow-xl scale-[1.03]`
                                                    )}
                                                >
                                                    {/* <div className="text-xs uppercase tracking-wider opacity-70">
                                                        {new Date(date.date).toLocaleDateString(undefined, {
                                                            weekday: "short",
                                                        })}
                                                    </div> */}

                                                    <div className="sm:text-2xl font-bold leading-none mt-1">
                                                        {new Date(date.date).getDate()}
                                                    </div>

                                                    <div className="text-[11px] opacity-70">
                                                        {new Date(date.date).toLocaleDateString(undefined, {
                                                            month: "short",
                                                        })}
                                                    </div>
                                                </button>
                                            </TooltipTrigger>

                                            <TooltipContent
                                                side="top"
                                                className="rounded-xl px-4 py-3"
                                            >
                                                <div className="space-y-1 text-center">

                                                    <div
                                                        className={cn(
                                                            "inline-flex items-center rounded-full px-2 py-1 text-[12px] font-medium",

                                                            date.status === "AVAILABLE" &&
                                                            "bg-green-200 text-green-700",

                                                            date.status === "PARTIAL" &&
                                                            "bg-yellow-100 text-yellow-700",

                                                            date.status === "FULL" &&
                                                            "bg-red-100 text-red-700",

                                                            date.status === "UNAVAILABLE" &&
                                                            "bg-gray-200 text-gray-600"
                                                        )}
                                                    >
                                                        {date.status}
                                                    </div>

                                                    <p className="text-[12px] text-muted">
                                                        {date.availableSlots}
                                                        {date.availableSlots === 1
                                                            ? " slot"
                                                            : " slots"}
                                                    </p>

                                                    {!disabled && (
                                                        <p className="text-[11px] text-primary font-medium">
                                                            Click to select
                                                        </p>
                                                    )}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );

}