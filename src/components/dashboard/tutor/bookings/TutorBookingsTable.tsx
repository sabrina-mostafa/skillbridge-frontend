"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/common/Pagination";
import TableHeaderSection from "@/components/common/TableHeaderSection";
import UserAvatar from "@/components/common/UserAvatar";
import { Booking } from "@/types/booking.types";
import BookingStatusBadge from "../../student/booking/BookingStatusBadge";
import PaymentStatusBadge from "../../student/booking/PaymentStatusBadge ";
import BookingStatusButton from "./BookingStatusButton";
import BookingEmptyState from "./BookingEmptyState";

type Props = {
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

export default function TutorBookingsTable({
    data,
    page,
    setPage,
    meta,
}: Props) {
    return (
        <div className="flex flex-col w-full">

            <div className="rounded-2xl border bg-card shadow-sm">
                <TableHeaderSection
                    title="Bookings"
                    description="Manage all tutoring bookings"
                />

                <div className="overflow-x-auto px-2">
                    <Table className="min-w-[1100px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Subject </TableHead>
                                <TableHead> Schedule </TableHead>
                                <TableHead> Duration </TableHead>
                                <TableHead> Status </TableHead>
                                <TableHead> Payment </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        <BookingEmptyState />
                                    </TableCell>
                                </TableRow>
                            )}

                            {data.map((booking) => {
                                const start = new Date(booking.startTime);
                                const end = new Date(booking.endTime);

                                const duration = (end.getTime() - start.getTime()) / 1000 / 60;

                                return (
                                    <TableRow key={booking.id} >

                                        {/* Student */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <UserAvatar
                                                    name={booking.student.user.name}
                                                    image={booking.student.user.image}
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {booking.student.user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Student
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Subject */}
                                        <TableCell>
                                            <span className="font-medium">
                                                {booking.category.name}
                                            </span>
                                        </TableCell>

                                        {/* Schedule */}
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">
                                                    {start.toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {start.toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            timeZone: "UTC",
                                                        }
                                                    )}
                                                    {" - "}
                                                    {end.toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            timeZone: "UTC",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Duration */}
                                        <TableCell>
                                            {duration} min
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <BookingStatusBadge
                                                status={
                                                    booking.status
                                                }
                                            />
                                        </TableCell>

                                        {/* Payment */}
                                        <TableCell>
                                            <PaymentStatusBadge
                                                status={
                                                    booking.paymentStatus
                                                }
                                            />
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <BookingStatusButton
                                                booking={booking}
                                                onSuccess={() => {
                                                    window.location.reload();
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {meta.totalPages > 1 && (
                <Pagination
                    page={page}
                    total={meta.total}
                    limit={meta.limit}
                    totalPages={meta.totalPages}
                    onPageChange={setPage}
                    className="max-w-full px-6 pb-0"
                />
            )}
        </div>
    );
}