"use client";

import Image from "next/image";
import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/booking.types";
import BookingActionsDropdown from "./BookingActionsDropdown";
import BookingStatusBadge from "./BookingStatusBadge";


type Props = {
    bookings: Booking[];

    onView: (booking: Booking) => void;
    onStatus: (booking: Booking) => void;
};

export default function BookingsTable({
    bookings,
    onView,
    onStatus,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="py-16 text-center text-muted-foreground"
                            >
                                No bookings found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                {/* Student */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                                            {booking.student?.user?.image ? (
                                                <Image
                                                    src={booking.student.user.image}
                                                    alt={booking.student.user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-semibold text-primary">
                                                    {booking.student?.user?.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {booking.student?.user?.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {booking.student?.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Tutor */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                                            {booking.tutor?.user?.image ? (
                                                <Image
                                                    src={booking.tutor.user.image}
                                                    alt={booking.tutor.user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-semibold text-primary">
                                                    {booking.tutor?.user?.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {booking.tutor?.user?.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {booking.tutor?.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Category */}
                                <TableCell>
                                    <span className="font-medium">
                                        {booking.category?.name}
                                    </span>
                                </TableCell>

                                {/* Schedule */}
                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {format(
                                                new Date(booking.date),
                                                "dd MMM yyyy"
                                            )}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(booking.startTime),
                                                "hh:mm a"
                                            )}{" "}
                                            -
                                            {" "}
                                            {format(
                                                new Date(booking.endTime),
                                                "hh:mm a"
                                            )}
                                        </p>
                                    </div>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <BookingStatusBadge
                                        status={booking.status}
                                    />
                                </TableCell>

                                {/* Meeting */}
                                <TableCell>
                                    {booking.meetingType ? (
                                        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                            {booking.meetingType}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <BookingActionsDropdown
                                        booking={booking}
                                        onView={() => onView(booking)}
                                        onStatus={() => onStatus(booking)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}