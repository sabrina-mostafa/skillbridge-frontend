"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { OverviewReport } from "@/types/reports.type";



export default function OverviewPreview({ data }: { data: OverviewReport }) {    
    if (!data?.data) return null;

    const rows = [
        {
            label: "Total Users",
            value: data.data.totalUsers,
        },
        {
            label: "Total Tutors",
            value: data.data.totalTutors,
        },
        {
            label: "Total Students",
            value: data.data.totalStudents,
        },
        {
            label: "Total Bookings",
            value: data.data.totalBookings,
        },
        {
            label: "Completed Bookings",
            value: data.data.completedBookings,
        },
        {
            label: "Total Reviews",
            value: data.data.totalReviews,
        },
        {
            label: "Average Rating",
            value: data.data.averageRating,
        },
        {
            label: "Contact Messages",
            value: data.data.totalContacts,
        },
    ];

    return (
        <div className="rounded-lg border">
            <Table>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.label}>
                            <TableCell className="font-medium w-72">
                                {row.label}
                            </TableCell>

                            <TableCell>
                                {row.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}