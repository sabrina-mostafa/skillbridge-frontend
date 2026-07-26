"use client";

import { Search, RotateCcw } from "lucide-react";

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
    type: string;
    tutorFilter: string;
    studentFilter: string;
    sort: string;

    onSearchChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onTutorFilterChange: (value: string) => void;
    onStudentFilterChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
};

export default function CategoryFilters({
    search,
    type,
    tutorFilter,
    studentFilter,
    sort,
    onSearchChange,
    onTypeChange,
    onTutorFilterChange,
    onStudentFilterChange,
    onSortChange,
    onReset,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
            {/* Implemented Reference Pattern: 1 column on mobile, 2 columns on tablet, proportional explicit layout on desktop */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">

                {/* Search - Spans 2 columns on tablet to match reference pattern layout */}
                <div className="relative sm:col-span-2 xl:col-span-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search categories, sub-categories..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 w-full"
                    />
                </div>

                {/* Category Type Select */}
                <Select value={type} onValueChange={onTypeChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Categories</SelectItem>
                        <SelectItem value="PARENT">Parent Categories</SelectItem>
                        <SelectItem value="CHILD">Sub Categories</SelectItem>
                    </SelectContent>
                </Select>

                {/* Tutors Select */}
                <Select value={tutorFilter} onValueChange={onTutorFilterChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tutors" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Tutors</SelectItem>
                        <SelectItem value="HAS">Has Tutors</SelectItem>
                        <SelectItem value="NONE">No Tutors</SelectItem>
                    </SelectContent>
                </Select>

                {/* Students Select */}
                <Select value={studentFilter} onValueChange={onStudentFilterChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Students" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Students</SelectItem>
                        <SelectItem value="HAS">Has Students</SelectItem>
                        <SelectItem value="NONE">No Students</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sorting Dropdown */}
                <Select value={sort} onValueChange={onSortChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="az">Name (A-Z)</SelectItem>
                        <SelectItem value="za">Name (Z-A)</SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset Button */}
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="w-full xl:w-auto gap-2 cursor-pointer"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>

            </div>
        </div>
    );
}
