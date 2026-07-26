"use client";

import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


type Props = {
    search: string;
    status: string;
    sortBy: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
};

export default function BookingFilters({
    search,
    status,
    sortBy,
    onSearchChange,
    onStatusChange,
    onSortChange,
    onReset,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">

                {/* Search */}
                <div className="relative sm:col-span-2 xl:col-span-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search tutor or student..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Booking Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
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

                        <SelectItem value="CANCELLED">
                            Cancelled
                        </SelectItem>

                        <SelectItem value="DECLINED">
                            Declined
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                    value={sortBy}
                    onValueChange={onSortChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="newest">
                            Newest
                        </SelectItem>

                        <SelectItem value="oldest">
                            Oldest
                        </SelectItem>

                        <SelectItem value="status">
                            Status
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset */}
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="w-full cursor-pointer gap-2 xl:w-auto"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}