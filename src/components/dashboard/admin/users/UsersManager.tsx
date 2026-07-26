"use client";

import { useCallback, useEffect, useState } from "react";
import UserFilters from "./UserFilters";
import { User } from "@/types/user.type";
import { Analytics } from "@/types/analytics.type";
import UsersTable from "./UsersTable";
import ChangeUserStatusDialog from "./ChangeUserStatusDialog";
import UserDetailsModal from "./UserDetailsModal";
import UserSummary from "./UserSummary";
import SectionHeader from "@/components/common/SectionHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import { useDebounce } from "@/hooks/useDebounce";


type Props = {
    users: User[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function UsersManager({
    users,
    analytics,
    meta
}: Props) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );
    const debouncedSearch = useDebounce(search, 400);

    const [role, setRole] = useState(
        searchParams.get("role") ?? "ALL"
    );

    const [status, setStatus] = useState(
        searchParams.get("status") ?? "ALL"
    );

    const [sortBy, setSortBy] = useState(() => {
        const sort = searchParams.get("sortBy");
        const order = searchParams.get("sortOrder");

        if (sort === "name")
            return "name";

        if (
            sort === "createdAt" &&
            order === "asc"
        )
            return "oldest";

        return "newest";
    });

    const updateQuery = useCallback(
        (updates: Record<string, string | undefined>) => {
            const params = new URLSearchParams(searchParams);

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
        },
        [pathname, router, searchParams]
    );

    useEffect(() => {
        const currentSearch =
            searchParams.get("searchTerm") ?? "";

        if (currentSearch === debouncedSearch) {
            return;
        }

        updateQuery({
            searchTerm: debouncedSearch || undefined,
            page: "1",
        });
    }, [debouncedSearch, searchParams, updateQuery]);


    return (
        <div className="space-y-6">
            <SectionHeader
                title="User Management"
                description="Manage students, tutors and administrator accounts."
            />

            <UserSummary
                totalUsers={analytics?.users?.total ?? 0}
                tutors={analytics?.users?.completedTutorProfiles ?? 0}
                students={analytics?.users?.completedStudentProfiles ?? 0}
                newUsers={analytics?.users?.last30DaysUsers ?? 0}
            />

            <UserFilters
                search={search}
                role={role}
                status={status}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onRoleChange={(value) => {
                    setRole(value);

                    updateQuery({
                        role: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onStatusChange={(value) => {
                    setStatus(value);

                    updateQuery({
                        status: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onSortChange={(value) => {
                    setSortBy(value);

                    if (value === "newest") {
                        updateQuery({
                            sortBy: "createdAt",
                            sortOrder: "desc",
                            page: "1",
                        });
                    } else if (value === "oldest") {
                        updateQuery({
                            sortBy: "createdAt",
                            sortOrder: "asc",
                            page: "1",
                        });
                    } else {
                        updateQuery({
                            sortBy: "name",
                            sortOrder: "asc",
                            page: "1",
                        });
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setRole("ALL");
                    setStatus("ALL");
                    setSortBy("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <UsersTable
                users={users}
                onViewDetails={(user) => {
                    setSelectedUser(user);
                    setDetailsOpen(true);
                }}
                onViewProfile={(user) => {
                    window.open(`/tutors/${(user.tutorProfile?.id)}`, "_blank");
                }}
                onToggleStatus={(user) => {
                    setSelectedUser(user);
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

            <UserDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                user={selectedUser}
            />

            <ChangeUserStatusDialog
                // key={selectedUser?.id}
                open={statusDialogOpen}
                onOpenChange={setStatusDialogOpen}
                user={selectedUser}
            />
        </div>
    );
}