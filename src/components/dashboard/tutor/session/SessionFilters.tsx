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
import { SESSION_STATUS, SessionStatus } from "@/constants/booking/BookingSessionStatus";


type Props = {
    sessionStatus: SessionStatus | "";
    meetingType: string;
    startDate?: Date;
    endDate?: Date;
    onSessionStatusChange: (value: SessionStatus | "") => void;
    onMeetingTypeChange: (value: string) => void;
    onStartDateChange: (date?: Date) => void;
    onEndDateChange: (date?: Date) => void;
    onClear: () => void;
};

export default function SessionFilters({
    sessionStatus,
    meetingType,
    startDate,
    endDate,
    onSessionStatusChange,
    onMeetingTypeChange,
    onStartDateChange,
    onEndDateChange,
    onClear
}: Props) {
    return (
        <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex w-full flex-col gap-6 p-5 lg:flex-row lg:items-end lg:justify-between">

                {/* LEFT */}
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <CalendarDays className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Sessions
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Filter by booking status or date range.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="grid w-full gap-3 lg:grid-cols-5 lg:w-auto">
                    <Select
                        value={sessionStatus || "all"}
                        onValueChange={(value) =>
                            onSessionStatusChange(
                                value === "all"
                                    ? ""
                                    : (value as SessionStatus)
                            )
                        }
                    >
                        <SelectTrigger className="w-full lg:w-44">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                Any Status
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.PENDING_CONFIRMATION}>
                                Pending
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.UPCOMING}>
                                Upcoming
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.ONGOING}>
                                Ongoing
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.COMPLETED}>
                                Completed
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.MISSED}>
                                Missed
                            </SelectItem>

                            <SelectItem value={SESSION_STATUS.CANCELLED}>
                                Cancelled
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={meetingType || "all"}
                        onValueChange={(value) =>
                            onMeetingTypeChange(
                                value === "all" ? "" : value
                            )
                        }
                    >
                        <SelectTrigger className="w-full lg:w-44">
                            <SelectValue placeholder="Meeting Type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Types
                            </SelectItem>

                            <SelectItem value="GOOGLE_MEET">
                                Google Meet
                            </SelectItem>

                            <SelectItem value="ZOOM">
                                Zoom
                            </SelectItem>

                            <SelectItem value="MICROSOFT_TEAMS">
                                Microsoft Teams
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