"use client";

import { Star, FilterX } from "lucide-react";

import DatePicker from "@/components/common/DatePicker";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    minRating: string;

    sortBy: string;
    sortOrder: string;

    startDate?: Date;
    endDate?: Date;

    onMinRatingChange: (value: string) => void;

    onSortByChange: (value: string) => void;
    onSortOrderChange: (value: string) => void;

    onStartDateChange: (date?: Date) => void;
    onEndDateChange: (date?: Date) => void;

    onClear: () => void;
};

export default function ReviewFilters({
    minRating,
    sortBy,
    sortOrder,
    startDate,
    endDate,
    onMinRatingChange,
    onSortByChange,
    onSortOrderChange,
    onStartDateChange,
    onEndDateChange,
    onClear,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex flex-wrap gap-6 p-5 lg:items-end lg:justify-between">

                {/* Left */}
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <Star className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Reviews
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Find reviews by rating or review date.
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-wrap gap-3">

                    {/* Rating */}
                    <div className="min-w-[100%] sm:min-w-40">
                        <Select
                            value={minRating || "all"}
                            onValueChange={(value) =>
                                onMinRatingChange(
                                    value === "all" ? "" : value
                                )
                            }
                        >
                            <SelectTrigger className="w-full lg:w-40">
                                <SelectValue placeholder="Rating" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    All Ratings
                                </SelectItem>

                                <SelectItem value="5">
                                    ⭐ 5 Stars
                                </SelectItem>

                                <SelectItem value="4">
                                    ⭐ 4+ Stars
                                </SelectItem>

                                <SelectItem value="3">
                                    ⭐ 3+ Stars
                                </SelectItem>

                                <SelectItem value="2">
                                    ⭐ 2+ Stars
                                </SelectItem>

                                <SelectItem value="1">
                                    ⭐ 1+ Star
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* From */}
                    <DatePicker
                        value={startDate}
                        onChange={onStartDateChange}
                        placeholder="From"
                        className="min-w-[100%] sm:min-w-40"

                    />

                    {/* To */}
                    <DatePicker
                        value={endDate}
                        onChange={onEndDateChange}
                        placeholder="To"
                        className="min-w-[99%] sm:min-w-40"
                    />

                    {/* Sort */}
                    <div className="min-w-[99%] sm:min-w-40">
                        <Select
                            value={sortBy}
                            onValueChange={onSortByChange}
                        >
                            <SelectTrigger className="w-full lg:w-44">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="createdAt">
                                    Latest
                                </SelectItem>

                                <SelectItem value="rating">
                                    Rating
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Order */}
                    <div className="min-w-[99%] sm:min-w-40">
                        <Select
                            value={sortOrder}
                            onValueChange={onSortOrderChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="desc">
                                    Desc
                                </SelectItem>

                                <SelectItem value="asc">
                                    Asc
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* clear */}
                    <Button
                        variant="outline"
                        onClick={onClear}
                        className="cursor-pointer min-w-[99%] sm:min-w-40"
                    >
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear
                    </Button>

                </div>
            </div>
        </div>
    );
}