"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import SectionHeader from "@/components/common/SectionHeader";
import { Booking } from "@/types/booking.types";
import BookingTable from "./BookingTable";
import { bookingClientService } from "@/services/booking/booking.client.service";
import BookingFilters from "./BookingFilters";
import { format } from "date-fns";
import BookingManagerSkeleton from "@/components/skeletons/BookingManagerSkeleton";



export default function BookingManager() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const [meta, setMeta] = useState({
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 1,
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);

                const res = await bookingClientService.getMine({
                    page,
                    limit: 8,
                    status: status || undefined,

                    startDate: startDate
                        ? format(startDate, "yyyy-MM-dd")
                        : undefined,

                    endDate: endDate
                        ? format(endDate, "yyyy-MM-dd")
                        : undefined,

                    sortBy: "date",
                    sortOrder: "desc",
                });

                if (res.error || !res.data) {
                    toast.error(res.error ?? "Failed to load bookings");
                    return;
                }

                setBookings(res.data.data);
                setMeta(res.data.meta);
            } catch {
                toast.error("Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [page, status, startDate, endDate]);

    if (loading) {
        return <BookingManagerSkeleton />;
    }

    // if (!loading && bookings.length === 0) {
    //     return (
    //         <EmptyState
    //             icon={<BookOpen className="h-8 w-8 text-muted-foreground" />}
    //             title="No bookings yet"
    //             description="Once you book a tutor, your bookings will appear here."
    //         />
    //     );
    // }


    return (
        <div className="space-y-8">
            <SectionHeader
                title="My Bookings"
                description="Manage and track your tutoring sessions"
            />

            <BookingFilters
                status={status}
                startDate={startDate}
                endDate={endDate}
                onStatusChange={setStatus}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onClear={() => {
                    setStatus("");
                    setStartDate(undefined);
                    setEndDate(undefined);
                    setPage(1);
                }}
            />

            <BookingTable
                data={bookings}
                page={page}
                setPage={setPage}
                meta={meta}
            />
        </div>
    );
}