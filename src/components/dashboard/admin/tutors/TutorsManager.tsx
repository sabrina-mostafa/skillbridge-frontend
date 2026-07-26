"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";

import TutorSummary from "./TutorSummary";
import { Analytics } from "@/types/analytics.type";
import TutorFilters from "./TutorFilters";
import TutorsTable from "./TutorsTable";
import TutorDetailsModal from "./TutorDetailsModal";
import ChangeTutorStatusDialog from "./ChangeTutorStatusDialog";
import ToggleFeaturedDialog from "./ToggleFeaturedDialog";
import { User } from "@/types/user.type";



type Props = {
    tutors: User[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function TutorsManager({
    tutors,
    analytics,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedTutor, setSelectedTutor] = useState<User | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [featuredDialogOpen, setFeaturedDialogOpen] = useState(false);

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );
    const [status, setStatus] = useState(
        searchParams.get("status") ?? "ALL"
    );
    const [featured, setFeatured] = useState(
        searchParams.get("isFeatured") ?? "ALL"
    );
    const [sort, setSort] = useState(() => {
        const sortBy = searchParams.get("sortBy");
        const order = searchParams.get("sortOrder");

        if (sortBy === "createdAt" && order === "desc")
            return "newest";

        if (sortBy === "createdAt" && order === "asc")
            return "oldest";

        if (sortBy === "avgRating" && order === "desc")
            return "highestRating";

        if (sortBy === "avgRating" && order === "asc")
            return "lowestRating";

        if (sortBy === "hourlyRate" && order === "desc")
            return "highestPrice";

        if (sortBy === "hourlyRate" && order === "asc")
            return "lowestPrice";

        return "newest";
    });

    const debouncedSearch = useDebounce(search, 400);

    function updateQuery(
        updates: Record<string, string | undefined>
    ) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    useEffect(() => {
        const currentSearch = searchParams.get("searchTerm") ?? "";

        if (currentSearch === debouncedSearch) return;

        updateQuery({
            searchTerm: debouncedSearch || undefined,
            page: "1",
        });
    }, [debouncedSearch]);


    return (
        <div className="space-y-6">
            <SectionHeader
                title="Tutor Management"
                description="Manage tutors, review their profiles, update account status, and control featured tutors."
            />

            <TutorSummary
                totalTutors={analytics.users.completedTutorProfiles}
                activeTutors={analytics.users.activeTutors}
                featuredTutors={analytics.overview.featuredTutors}
                averageRating={analytics.reviews.averageRating}
            />

            <TutorFilters
                search={search}
                status={status}
                featured={featured}
                sort={sort}
                onSearchChange={setSearch}
                onStatusChange={(value) => {
                    setStatus(value);

                    updateQuery({
                        status: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onFeaturedChange={(value) => {
                    setFeatured(value);

                    updateQuery({
                        isFeatured: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onSortChange={(value) => {
                    setSort(value);

                    switch (value) {
                        case "newest":
                            updateQuery({
                                sortBy: "createdAt",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;

                        case "oldest":
                            updateQuery({
                                sortBy: "createdAt",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;

                        case "highestRating":
                            updateQuery({
                                sortBy: "avgRating",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;

                        case "lowestRating":
                            updateQuery({
                                sortBy: "avgRating",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;

                        case "highestPrice":
                            updateQuery({
                                sortBy: "hourlyRate",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;

                        case "lowestPrice":
                            updateQuery({
                                sortBy: "hourlyRate",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setStatus("ALL");
                    setFeatured("ALL");
                    setSort("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <TutorsTable
                tutors={tutors}
                onViewDetails={(tutor) => {
                    setSelectedTutor(tutor);
                    setDetailsOpen(true);
                }}
                onViewProfile={(tutor) => {
                    window.open(`/tutors/${(tutor.tutorProfile?.id)}`, "_blank");
                }}
                onToggleStatus={(tutor) => {
                    setSelectedTutor(tutor);
                    setStatusDialogOpen(true);
                }}
                onToggleFeatured={(tutor) => {
                    setSelectedTutor(tutor);
                    setFeaturedDialogOpen(true);
                }}
            />

            <Pagination
                page={meta?.page ?? 1}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                limit={meta?.limit ?? 10}
                onPageChange={(page) =>
                    updateQuery({
                        page: String(page),
                    })
                }
                className="max-w-8xl sm:px-6"
            />

            <TutorDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                tutor={selectedTutor}
            />

            <ChangeTutorStatusDialog
                open={statusDialogOpen}
                onOpenChange={setStatusDialogOpen}
                tutor={selectedTutor}
            />

            <ToggleFeaturedDialog
                open={featuredDialogOpen}
                onOpenChange={setFeaturedDialogOpen}
                tutor={selectedTutor}
            />
        </div>
    );
}