"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CategoryFilterBar() {
    const { searchParams, setQuery, clearAll } = useQueryParams();

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const current = searchParams.get("search") || "";

        if (current !== debouncedSearch) {
            setQuery("search", debouncedSearch);
        }
    }, [debouncedSearch]);


    return (
        <div className="mb-10 w-full rounded-3xl border bg-card/70 backdrop-blur-sm p-4 shadow-sm">

            <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <SlidersHorizontal className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Categories
                        </h3>

                        <p className="text-xs text-muted-foreground">
                            Quickly find the right learning category
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap gap-3">
                    {/* SEARCH */}
                    <div className="relative min-w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search categories, courses..."
                            className="h-10 pl-10 rounded-xl"
                        />
                    </div>

                    {/* SORT BY */}
                    <Select
                        value={searchParams.get("sortBy") || "createdAt"}
                        onValueChange={(value) => setQuery("sortBy", value)}
                    >
                        <SelectTrigger className="min-h-10 min-w-42.5 rounded-xl border bg-background px-4 shadow-sm hover:bg-muted/50 transition">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>

                        <SelectContent className="rounded-lg font-bold">
                            <SelectItem className="h-9 p-4 focus:bg-primary focus:text-primary-foreground" value="name">Name</SelectItem>
                            <SelectItem className="h-9 p-4 focus:bg-primary focus:text-primary-foreground" value="createdAt">Created Date</SelectItem>
                            <SelectItem className="h-9 p-4 focus:bg-primary focus:text-primary-foreground" value="updatedAt">Updated Date</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* SORT ORDER */}
                    <Select
                        value={searchParams.get("sortOrder") || "desc"}
                        onValueChange={(value) => setQuery("sortOrder", value)}
                    >
                        <SelectTrigger className="min-h-10 min-w-42.5 rounded-xl border bg-background px-4 shadow-sm hover:bg-muted/50 transition">
                            <SelectValue placeholder="Order" />
                        </SelectTrigger>

                        <SelectContent className="rounded-lg font-bold">
                            <SelectItem className="h-9 p-4 focus:bg-primary focus:text-primary-foreground" value="asc">
                                Ascending
                            </SelectItem>

                            <SelectItem className="h-9 p-4 focus:bg-primary focus:text-primary-foreground" value="desc">
                                Descending
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* RESET */}
                    <Button
                        variant="ghost"
                        className="h-10 rounded-xl bg-primary/10 text-primary font-semibold"
                        onClick={() => {
                            clearAll("/category", { scroll: false });
                            setSearch("");
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}