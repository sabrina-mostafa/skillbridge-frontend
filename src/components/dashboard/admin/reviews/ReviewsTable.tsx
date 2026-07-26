"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Star } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Review } from "@/types/review.type";
import ReviewActionsDropdown from "./ReviewActionsDropdown";


type Props = {
    reviews: Review[];

    onView: (review: Review) => void;
    onDelete: (review: Review) => void;
};

export default function ReviewsTable({
    reviews,
    onView,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {reviews.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="py-16 text-center text-muted-foreground"
                            >
                                No reviews found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        reviews.map((review) => (
                            <TableRow key={review.id}>
                                {/* Student */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                                            {review.student.user.image ? (
                                                <Image
                                                    src={review.student.user.image}
                                                    alt={review.student.user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-semibold text-primary">
                                                    {review.student.user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {review.student.user.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {review.student.education}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Tutor */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                                            {review.tutor.user.image ? (
                                                <Image
                                                    src={review.tutor.user.image}
                                                    alt={review.tutor.user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-semibold text-primary">
                                                    {review.tutor.user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {review.tutor.user.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {review.tutor.education}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Category */}
                                <TableCell>
                                    <span className="font-medium">
                                        {review.booking.category.name}
                                    </span>
                                </TableCell>

                                {/* Rating */}
                                <TableCell>
                                    <div className="flex items-center gap-1 font-medium">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {review.rating.toFixed(1)}
                                    </div>
                                </TableCell>

                                {/* Comment */}
                                <TableCell className="max-w-xs">
                                    <p className="truncate text-muted-foreground">
                                        {review.comment || "—"}
                                    </p>
                                </TableCell>

                                {/* Date */}
                                <TableCell>
                                    {format(
                                        new Date(review.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <ReviewActionsDropdown
                                        review={review}
                                        onView={() => onView(review)}
                                        onDelete={() => onDelete(review)}
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