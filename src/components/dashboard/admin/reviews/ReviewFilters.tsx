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
    rating: string;
    sortBy: string;

    onSearchChange: (value: string) => void;
    onRatingChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
};

export default function ReviewFilters({
    search,
    rating,
    sortBy,
    onSearchChange,
    onRatingChange,
    onSortChange,
    onReset,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">

                {/* Search */}
                <div className="relative sm:col-span-2 xl:col-span-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search by tutor or student..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                {/* Rating */}
                <Select
                    value={rating}
                    onValueChange={onRatingChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Minimum Rating" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
                            All Ratings
                        </SelectItem>

                        <SelectItem value="5">
                            5 Stars
                        </SelectItem>

                        <SelectItem value="4">
                            4+ Stars
                        </SelectItem>

                        <SelectItem value="3">
                            3+ Stars
                        </SelectItem>

                        <SelectItem value="2">
                            2+ Stars
                        </SelectItem>

                        <SelectItem value="1">
                            1+ Star
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

                        <SelectItem value="rating">
                            Highest Rating
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset */}
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="w-full gap-2 cursor-pointer xl:w-auto"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>

            </div>
        </div>
    );
}