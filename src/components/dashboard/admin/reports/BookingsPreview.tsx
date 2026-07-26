"use client";

import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookingsReport } from "@/types/reports.type";




export default function BookingsPreview({bookings}: {bookings: BookingsReport}) {

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>
                                {booking.student.user.name}
                            </TableCell>

                            <TableCell>
                                {booking.tutor.user.name}
                            </TableCell>

                            <TableCell>
                                {booking.category.name}
                            </TableCell>

                            <TableCell>
                                {booking.status}
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(booking.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}