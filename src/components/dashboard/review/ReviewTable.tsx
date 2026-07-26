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

import { Button } from "@/components/ui/button";

import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { Review } from "@/types/review.type";
import ReviewEmptyState from "./ReviewEmptyState";


type Props = {
    data: Review[];
    page: number;
    setPage: (page: number) => void;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    readOnly?: boolean;
    onView: (review: Review) => void;
    onEdit?: (review: Review) => void;
    onDelete?: (review: Review) => void;
};

export default function ReviewTable({
    data,
    page,
    setPage,
    meta,
    readOnly,
    onView,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="rounded-2xl border bg-card shadow-sm">
                <TableHeaderSection
                    title="My Reviews"
                    description="Manage all reviews you've submitted."
                />

                <div className="overflow-x-auto px-2">
                    <Table className="min-w-[900px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>{readOnly ? "Student" : "Tutor"}</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Review</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    {readOnly ? "View" : "Actions"}
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-87.5 p-0"
                                    >
                                        <ReviewEmptyState />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((review) => (
                                    <TableRow key={review.id}>

                                        {readOnly ? (
                                            // Student
                                            < TableCell >
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar
                                                        name={review.student?.user.name ?? "Tutor"}
                                                        image={review.student?.user.image}
                                                    />

                                                    <div>
                                                        <p className="font-medium">
                                                            {review.student?.user.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {review.student?.education}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        ) : (
                                            //  Tutor 
                                            < TableCell >
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar
                                                        name={review.tutor?.user.name ?? "Tutor"}
                                                        image={review.tutor?.user.image}
                                                    />

                                                    <div>
                                                        <p className="font-medium">
                                                            {review.tutor?.user.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {review.tutor?.education}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        )}

                                        {/* Course */}
                                        <TableCell>
                                            <div className="font-medium">
                                                {review.booking?.category.name}
                                            </div>
                                        </TableCell>

                                        {/* Rating */}
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {"★".repeat(
                                                    review.rating
                                                )}

                                                <span className="text-muted-foreground">
                                                    ({review.rating})
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Review */}
                                        <TableCell className="max-w-xs">
                                            <p className="truncate text-sm text-muted-foreground">
                                                {review.comment ?? "No comment"}
                                            </p>
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell>
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                    onClick={() => onView(review)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                {!readOnly && onEdit && onDelete && (
                                                    <>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                onEdit(review)
                                                            }
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="cursor-pointer text-destructive hover:text-destructive"
                                                            onClick={() =>
                                                                onDelete(review)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}

                        </TableBody>
                    </Table>
                </div>
            </div>

            {
                meta.totalPages > 1 && (
                    <Pagination
                        page={page}
                        total={meta.total}
                        limit={meta.limit}
                        totalPages={meta.totalPages}
                        onPageChange={setPage}
                        className="px-6"
                    />
                )
            }
        </div >
    );
}