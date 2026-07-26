"use client";

import { useCallback, useEffect, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";
import BookingSummary from "./BookingSummary";
import { useDebounce } from "@/hooks/useDebounce";
import { Analytics } from "@/types/analytics.type";
import { Booking } from "@/types/booking.types";
import { GetAllBookingFilters } from "@/services/booking/booking.server.service";
import BookingFilters from "./BookingFilters";
import BookingsTable from "./BookingsTable";
import BookingDetailsModal from "./BookingDetailsModal";
import ChangeBookingStatusDialog from "./ChangeBookingStatusDialog";


type Props = {
    bookings: Booking[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    initialFilters: GetAllBookingFilters;
};

export default function BookingsManager({
    bookings,
    analytics,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [statusDialogOpen, setStatusDialogOpen] = useState(false);

    const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");

    const debouncedSearch = useDebounce(search, 400);

    const [status, setStatus] = useState(
        searchParams.get("status") ?? "ALL"
    );

    const [sortBy, setSortBy] = useState(() => {
        const sort = searchParams.get("sortBy");
        const order = searchParams.get("sortOrder");

        if (
            sort === "date" &&
            order === "asc"
        )
            return "oldest";

        if (
            sort === "date" &&
            order === "desc"
        )
            return "newest";

        if (
            sort === "status"
        )
            return "status";

        return "newest";
    });

    const updateQuery = useCallback(
        (
            updates: Record<
                string,
                string | undefined
            >
        ) => {
            const params =
                new URLSearchParams(searchParams);

            Object.entries(updates).forEach(
                ([key, value]) => {
                    if (!value) {
                        params.delete(key);
                    } else {
                        params.set(key, value);
                    }
                }
            );

            router.push(
                `${pathname}?${params.toString()}`,
                {
                    scroll: false,
                }
            );
        },
        [pathname, router, searchParams]
    );

    useEffect(() => {
        const currentSearch =
            searchParams.get("searchTerm") ?? "";

        if (
            currentSearch === debouncedSearch
        )
            return;

        updateQuery({
            searchTerm:
                debouncedSearch || undefined,
            page: "1",
        });
    }, [
        debouncedSearch,
        searchParams,
        updateQuery,
    ]);

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Booking Management"
                description="Manage and monitor all tutor bookings across the platform."
            />

            <BookingSummary
                totalBookings={analytics?.bookings?.total ?? 0}
                pending={analytics?.bookings?.pending ?? 0}
                confirmed={analytics?.bookings?.confirmed ?? 0}
                completed={analytics?.bookings?.completed ?? 0}
            />

            <BookingFilters
                search={search}
                status={status}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onStatusChange={(value) => {
                    setStatus(value);

                    updateQuery({
                        status:
                            value === "ALL"
                                ? undefined
                                : value,
                        page: "1",
                    });
                }}
                onSortChange={(value) => {
                    setSortBy(value);

                    if (value === "newest") {
                        updateQuery({
                            sortBy: "date",
                            sortOrder: "desc",
                            page: "1",
                        });
                    } else if (
                        value === "oldest"
                    ) {
                        updateQuery({
                            sortBy: "date",
                            sortOrder: "asc",
                            page: "1",
                        });
                    } else {
                        updateQuery({
                            sortBy: "status",
                            sortOrder: "asc",
                            page: "1",
                        });
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setStatus("ALL");
                    setSortBy("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <BookingsTable
                bookings={bookings}
                onView={(booking) => {
                    setSelectedBooking(booking);
                    setDetailsOpen(true);
                }}
                onStatus={(booking) => {
                    setSelectedBooking(booking);
                    setStatusDialogOpen(true);
                }}
            />

            <Pagination
                page={meta?.page ?? 1}
                total={meta?.total ?? 0}
                totalPages={
                    meta?.totalPages ?? 1
                }
                limit={meta?.limit ?? 10}
                onPageChange={(page) =>
                    updateQuery({
                        page: String(page),
                    })
                }
                className="max-w-8xl sm:px-6"
            />

            <BookingDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                booking={selectedBooking}
            />

            <ChangeBookingStatusDialog
                open={statusDialogOpen}
                onOpenChange={setStatusDialogOpen}
                booking={selectedBooking}
            />
        </div>
    );
}