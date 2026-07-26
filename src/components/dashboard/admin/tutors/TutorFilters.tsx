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
    featured: string;
    sort: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onFeaturedChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
};

export default function TutorFilters({
    search,
    status,
    featured,
    sort,
    onSearchChange,
    onStatusChange,
    onFeaturedChange,
    onSortChange,
    onReset,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">

                {/* Search */}
                <div className="relative sm:col-span-2 xl:col-span-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        placeholder="Search tutors..."
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
                            All Status
                        </SelectItem>

                        <SelectItem value="ACTIVE">
                            Active
                        </SelectItem>

                        <SelectItem value="BLOCKED">
                            Blocked
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Featured */}
                <Select
                    value={featured}
                    onValueChange={onFeaturedChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Featured" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
                            All Tutors
                        </SelectItem>

                        <SelectItem value="true">
                            Featured
                        </SelectItem>

                        <SelectItem value="false">
                            Not Featured
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                    value={sort}
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

                        <SelectItem value="highestRating">
                            Highest Rating
                        </SelectItem>

                        <SelectItem value="lowestRating">
                            Lowest Rating
                        </SelectItem>

                        <SelectItem value="highestPrice">
                            Highest Price
                        </SelectItem>

                        <SelectItem value="lowestPrice">
                            Lowest Price
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset */}
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="w-full gap-2 sm:w-auto cursor-pointer"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}