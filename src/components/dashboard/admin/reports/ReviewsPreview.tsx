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
import { ReviewsReport } from "@/types/reports.type";


export default function ReviewsPreview({ reviews }: { reviews: ReviewsReport }) {

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell>
                                {review.student.user.name}
                            </TableCell>

                            <TableCell>
                                {review.tutor.user.name}
                            </TableCell>

                            <TableCell>
                                {review.rating}/5
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(review.createdAt),
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