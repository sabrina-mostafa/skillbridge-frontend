"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/components/common/UserAvatar";
import TableHeaderSection from "@/components/common/TableHeaderSection";
import BookingStatusBadge from "./BookingStatusBadge";
import { Booking } from "@/types/booking.types";
import PaymentStatusBadge from "./PaymentStatusBadge ";
import Pagination from "@/components/common/Pagination";
import StudentBookingStatusButton from "./StudentBookingStatusButton";
import BookingEmptyState from "../../tutor/bookings/BookingEmptyState";


type BookingTableProps = {
    data: Booking[];
    page: number;
    setPage: (page: number) => void;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function BookingTable({
    data,
    page,
    setPage,
    meta,
}: BookingTableProps) {

    return (
        <div className="flex flex-col w-full">
            <div className="rounded-2xl border bg-card shadow-sm">
                <TableHeaderSection
                    title="Bookings"
                    description="All your scheduled tutoring sessions"
                />

                {/* TABLE */}
                <div className="px-2 py-1 overflow-x-auto">
                    <Table className="min-w-[740]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tutor</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-87.5 p-0"
                                    >
                                        <BookingEmptyState/>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((booking) => {
                                    const start = new Date(booking.startTime);
                                    const end = new Date(booking.endTime);

                                    const duration =
                                        (end.getTime() - start.getTime()) / (1000 * 60);

                                    return (
                                        <TableRow key={booking.id}>
                                            {/* Tutor */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar
                                                        name={booking.tutor.user.name}
                                                        image={booking.tutor.user.image}
                                                    />

                                                    <div>
                                                        <p className="font-medium">
                                                            {booking.tutor.user.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {booking.tutor.education}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Category */}
                                            <TableCell>
                                                <div className="font-medium">
                                                    {booking.category.name}
                                                </div>
                                            </TableCell>

                                            {/* Schedule */}
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">
                                                        {start.toLocaleDateString(undefined, {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {start.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            timeZone: "UTC",
                                                        })}
                                                        {" - "}
                                                        {end.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            timeZone: "UTC",
                                                        })}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            {/* Duration */}
                                            <TableCell>
                                                <span className="text-sm">
                                                    {duration} min
                                                </span>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <BookingStatusBadge
                                                    status={booking.status}
                                                />
                                            </TableCell>

                                            {/* Payment */}
                                            <TableCell>
                                                <PaymentStatusBadge
                                                    status={booking.paymentStatus}
                                                />
                                            </TableCell>

                                            {/* Action */}
                                            <TableCell className="text-right">
                                                <StudentBookingStatusButton
                                                    booking={booking}
                                                    onSuccess={() => {
                                                        window.location.reload();
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* PAGINATION */}
            {meta.totalPages > 1 && (
                <Pagination
                    page={page}
                    total={meta.total}
                    limit={meta.limit}
                    totalPages={meta.totalPages}
                    onPageChange={setPage}
                    className="px-6 max-w-full pb-0"
                />
            )}
        </div>
    );
}