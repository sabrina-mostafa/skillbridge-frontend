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
import { Booking } from "@/types/booking.types";
import Pagination from "@/components/common/Pagination";
import MeetingTypeBadge from "../../common/MeetingTypeBadge";
import SessionStatusBadge from "./SessionStatusBadge";
import { getSessionStatus } from "@/utils/session/sessionStatus.utils";
import StudentSessionActionButton from "./StudentSessionActionButton";
import SessionEmptyState from "../../tutor/session/SessionEmptyState";


type SessionTableProps = {
    data: Booking[];
    page: number;
    setPage: (page: number) => void;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onView: (booking: Booking) => void;
    onReview: (booking: Booking) => void;
};

export default function SessionTable({
    data,
    page,
    setPage,
    meta,
    onView,
    onReview,
}: SessionTableProps) {

    return (
        <div className="flex flex-col w-full">
            <div className="rounded-2xl border bg-card shadow-sm">
                <TableHeaderSection
                    title="Sessions"
                    description="Manage all your scheduled tutoring sessions"
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
                                <TableHead>Meeting Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-87.5 p-0"
                                    >
                                        <SessionEmptyState />
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
                                                        })}
                                                        {" - "}
                                                        {end.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
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

                                            {/* Meeting */}
                                            <TableCell>
                                                <MeetingTypeBadge
                                                    type={booking.meetingType}
                                                />
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <SessionStatusBadge
                                                    status={getSessionStatus(booking)}
                                                />
                                            </TableCell>

                                            {/* Action */}
                                            <TableCell className="text-right">
                                                <StudentSessionActionButton
                                                    booking={booking}
                                                    onView={onView}
                                                    onReview={onReview}
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