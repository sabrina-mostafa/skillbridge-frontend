"use client";

import { CalendarDays, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/common/DatePicker";

type Props = {
    status: string;
    startDate?: Date;
    endDate?: Date;
    onStatusChange: (value: string) => void;
    onStartDateChange: (value: Date | undefined) => void;
    onEndDateChange: (value: Date | undefined) => void;
    onClear: () => void;
};


export default function TutorBookingsFilters({
    status,
    startDate,
    endDate,
    onStatusChange,
    onStartDateChange,
    onEndDateChange,
    onClear,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-end lg:justify-between">

                {/* LEFT */}
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <CalendarDays className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Bookings
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Filter by booking status or date range.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="grid w-full gap-3 md:grid-cols-4 lg:w-auto">
                    <Select
                        value={status || "all"}
                        onValueChange={(value) =>
                            onStatusChange(
                                value === "all" ? "" : value
                            )
                        }
                    >
                        <SelectTrigger className="w-full lg:w-44">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Status
                            </SelectItem>

                            <SelectItem value="PENDING">
                                Pending
                            </SelectItem>

                            <SelectItem value="CONFIRMED">
                                Confirmed
                            </SelectItem>

                            <SelectItem value="COMPLETED">
                                Completed
                            </SelectItem>

                            <SelectItem value="DECLINED">
                                Declined
                            </SelectItem>

                            <SelectItem value="CANCELLED">
                                Cancelled
                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <DatePicker
                        value={startDate}
                        onChange={onStartDateChange}
                        placeholder="From"
                    />

                    <DatePicker
                        value={endDate}
                        onChange={onEndDateChange}
                        placeholder="To"
                    />

                    <Button
                        variant="outline"
                        onClick={onClear}
                        className="cursor-pointer"
                    >
                        <FilterX className="mr-2 h-4 w-4" />

                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
}