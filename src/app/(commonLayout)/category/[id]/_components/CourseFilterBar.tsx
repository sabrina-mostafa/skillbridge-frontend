"use client";

import { Search, SlidersHorizontal, Users, GraduationCap, UserX, School } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CourseFilterBar() {
    const pathname = usePathname();
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
        <div className="w-full mb-10 rounded-3xl border bg-card/70 backdrop-blur-sm p-4 shadow-sm">

            <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <SlidersHorizontal className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Courses
                        </h3>

                        <p className="text-xs text-muted-foreground">
                            Quickly find the right learning course
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
                            placeholder="Search courses..."
                            className="h-10 pl-10 rounded-xl"
                        />
                    </div>

                    {/* HAS TUTORS */}
                    <Button
                        variant={
                            searchParams.get("hasTutors") === "true"
                                ? "default"
                                : "outline"
                        }
                        className="h-10 rounded-xl"
                        onClick={() =>
                            setQuery(
                                "hasTutors",
                                searchParams.get("hasTutors") === "true"
                                    ? ""
                                    : "true"
                            )
                        }
                    >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Has Tutors
                    </Button>

                    {/* HAS STUDENTS */}
                    <Button
                        variant={
                            searchParams.get("hasStudents") === "true"
                                ? "default"
                                : "outline"
                        }
                        className="h-10 rounded-xl"
                        onClick={() =>
                            setQuery(
                                "hasStudents",
                                searchParams.get("hasStudents") === "true"
                                    ? ""
                                    : "true"
                            )
                        }
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Has Students
                    </Button>

                    {/* NO TUTORS */}
                    <Button
                        variant={
                            searchParams.get("withNoTutor") === "true"
                                ? "default"
                                : "outline"
                        }
                        className="h-10 rounded-xl"
                        onClick={() =>
                            setQuery(
                                "withNoTutor",
                                searchParams.get("withNoTutor") === "true"
                                    ? ""
                                    : "true"
                            )
                        }
                    >
                        <School className="w-4 h-4 mr-2" />
                        No Tutors
                    </Button>

                    {/* NO STUDENTS */}
                    <Button
                        variant={
                            searchParams.get("withNoStudent") === "true"
                                ? "default"
                                : "outline"
                        }
                        className="h-10 rounded-xl"
                        onClick={() =>
                            setQuery(
                                "withNoStudent",
                                searchParams.get("withNoStudent") === "true"
                                    ? ""
                                    : "true"
                            )
                        }
                    >
                        <UserX className="w-4 h-4 mr-2" />
                        No Students
                    </Button>

                    {/* RESET */}
                    <Button
                        variant="ghost"
                        className="h-10 rounded-xl bg-primary/10 text-primary font-semibold"
                        onClick={() => {
                            clearAll(pathname, { scroll: false });
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