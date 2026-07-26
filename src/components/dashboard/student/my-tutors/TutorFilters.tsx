"use client";

import {
    Search,
    FilterX,
    GraduationCap,
} from "lucide-react";

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
    sortBy: string;
    sortOrder: string;

    onSearchChange: (value: string) => void;
    onSortByChange: (value: string) => void;
    onSortOrderChange: (value: string) => void;
    onClear: () => void;
};

export default function TutorFilters({
    search,
    sortBy,
    sortOrder,
    onSearchChange,
    onSortByChange,
    onSortOrderChange,
    onClear,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex w-full flex-col gap-6 p-5 lg:flex-row lg:items-end lg:justify-between">

                {/* Left */}
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Tutors
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Search tutors or organize them by different criteria.
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-wrap gap-4">

                    {/* Search */}
                    <div className="relative w-full lg:w-fit">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={search}
                            placeholder="Search tutor..."
                            className="w-full pl-9 lg:w-64"
                            onChange={(e) =>
                                onSearchChange(e.target.value)
                            }
                        />
                    </div>

                    {/* Sort By */}
                    <Select
                        value={sortBy}
                        onValueChange={onSortByChange}
                    >
                        <SelectTrigger className="w-full lg:w-44">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="recent">
                                Recent Session
                            </SelectItem>

                            <SelectItem value="name">
                                Tutor Name
                            </SelectItem>

                            <SelectItem value="sessions">
                                Total Sessions
                            </SelectItem>

                            <SelectItem value="completed">
                                Completed Sessions
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Sort Order */}
                    <Select
                        value={sortOrder}
                        onValueChange={onSortOrderChange}
                    >
                        <SelectTrigger className="w-full lg:w-40">
                            <SelectValue placeholder="Order" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="desc">
                                Descending
                            </SelectItem>

                            <SelectItem value="asc">
                                Ascending
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Clear */}
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