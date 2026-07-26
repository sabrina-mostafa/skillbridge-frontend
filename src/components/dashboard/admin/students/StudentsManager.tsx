"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";
import { Analytics } from "@/types/analytics.type";
import { User } from "@/types/user.type";
import StudentFilters from "./StudentFilters";
import StudentSummary from "./StudentSummary";
import StudentsTable from "./StudentsTable";
import StudentDetailsModal from "./StudentDetailsModal";
import ChangeStudentStatusDialog from "./ChangeStudentStatusDialog";


type Props = {
    students: User[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function StudentsManager({
    students,
    analytics,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedStudent, setSelectedStudent] =
        useState<User | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] =
        useState(false);

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );

    const [status, setStatus] = useState(
        searchParams.get("status") ?? "ALL"
    );

    const [sort, setSort] = useState(() => {
        const sortBy = searchParams.get("sortBy");
        const order = searchParams.get("sortOrder");

        if (sortBy === "createdAt" && order === "asc") {
            return "oldest";
        }

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
        const currentSearch =
            searchParams.get("searchTerm") ?? "";

        if (currentSearch === debouncedSearch) return;

        updateQuery({
            searchTerm: debouncedSearch || undefined,
            page: "1",
        });
    }, [debouncedSearch]);

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Student Management"
                description="Manage student accounts, review profiles, and control account status."
            />

            <StudentSummary
                totalStudents={
                    analytics?.users?.activeStudents ??
                    0
                }
                studentProfiles={
                    analytics?.users?.completedStudentProfiles ?? 0
                }
                newStudents={
                    analytics?.users?.last30DaysStudents ??
                    0
                }
                totalBookings={
                    analytics?.bookings?.total ?? 0
                }
            />

            <StudentFilters
                search={search}
                status={status}
                sort={sort}
                onSearchChange={setSearch}
                onStatusChange={(value) => {
                    setStatus(value);

                    updateQuery({
                        status: value === "ALL" ? undefined : value,
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

                        case "nameAsc":
                            updateQuery({
                                sortBy: "name",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;

                        case "nameDesc":
                            updateQuery({
                                sortBy: "name",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setStatus("ALL");
                    setSort("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <StudentsTable
                students={students}
                onViewDetails={(student) => {
                    setSelectedStudent(student);
                    setDetailsOpen(true);
                }}
                onToggleStatus={(student) => {
                    setSelectedStudent(student);
                    setStatusDialogOpen(true);
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

            <StudentDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                student={selectedStudent}
            />

            <ChangeStudentStatusDialog
                open={statusDialogOpen}
                onOpenChange={setStatusDialogOpen}
                student={selectedStudent}
            />
        </div>
    );
}