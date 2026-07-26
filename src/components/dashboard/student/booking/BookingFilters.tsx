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


type BookingFiltersProps = {
    status: string;

    startDate?: Date;
    endDate?: Date;

    onStatusChange: (value: string) => void;
    onStartDateChange: (value: Date | undefined) => void;
    onEndDateChange: (value: Date | undefined) => void;

    onClear: () => void;
};

export default function BookingFilters({
    status,
    startDate,
    endDate,
    onStatusChange,
    onStartDateChange,
    onEndDateChange,
    onClear,
}: BookingFiltersProps) {
    return (
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex flex-wrap flex-col gap-4 xl:flex-row xl:items-center lg:justify-between">
                {/* Left */}
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarDays className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">
                            Filter Bookings
                        </h3>

                        <p className="text-xs text-muted-foreground">
                            Find sessions by status or date range
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-wrap gap-3 md:items-center xl:justify-end">
                    <Select
                        value={status || "all"}
                        onValueChange={(value) =>
                            onStatusChange(value === "all" ? "" : value)
                        }
                    >
                        <SelectTrigger className="min-w-[99%] sm:min-w-40">
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
                        placeholder="From date"
                        className="min-w-[99%] sm:min-w-40"
                    />

                    <DatePicker
                        value={endDate}
                        onChange={onEndDateChange}
                        placeholder="To date"
                        className="min-w-[99%] sm:min-w-40"
                    />

                    <Button
                        className="cursor-pointer min-w-[99%] sm:min-w-24"
                        variant="outline"
                        size="icon"
                        onClick={onClear}
                        title="Clear Filters"
                    >
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
}