"use client";

import {
    Eye,
    GraduationCap,
    Mail,
} from "lucide-react";

import Pagination from "@/components/common/Pagination";
import TableHeaderSection from "@/components/common/TableHeaderSection";
import UserAvatar from "@/components/common/UserAvatar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentTutor } from "@/types/tutor-student.type";
import TutorEmptyState from "./TutorEmptyState";


type Props = {
    data: StudentTutor[];
    page: number;
    setPage: (page: number) => void;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    onView: (tutor: StudentTutor) => void;
};

export default function TutorTable({
    data,
    page,
    setPage,
    meta,
    onView,
}: Props) {
    return (
        <div className="flex w-full flex-col">
            <div className="rounded-2xl border bg-card shadow-sm">

                <TableHeaderSection
                    title="My Tutors"
                    description="Tutors you've booked sessions with."
                />

                <div className="overflow-x-auto px-2">
                    <Table className="min-w-250">

                        <TableHeader>
                            <TableRow>
                                <TableHead>Tutor</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Education</TableHead>
                                <TableHead>Total Sessions</TableHead>
                                <TableHead>Completed</TableHead>
                                <TableHead>Latest Session</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-87.5 p-0"
                                    >
                                        <TutorEmptyState />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((tutor) => (
                                    <TableRow key={tutor.tutor.id}>

                                        {/* Tutor */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <UserAvatar
                                                    name={tutor.tutor.user.name}
                                                    image={tutor.tutor.user.image}
                                                />

                                                <div>
                                                    <p className="font-medium">
                                                        {tutor.tutor.user.name}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Tutor
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />

                                                {tutor.tutor.user.email}
                                            </div>
                                        </TableCell>

                                        {/* Education */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-primary" />

                                                {tutor.tutor.education || "-"}
                                            </div>
                                        </TableCell>

                                        {/* Total Sessions */}
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {tutor.totalSessions}
                                            </Badge>
                                        </TableCell>

                                        {/* Completed Sessions */}
                                        <TableCell>
                                            <Badge>
                                                {tutor.completedSessions}
                                            </Badge>
                                        </TableCell>

                                        {/* Latest Session */}
                                        <TableCell>
                                            {tutor.latestBooking?.date
                                                ? new Date(
                                                      tutor.latestBooking.date
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </TableCell>

                                        {/* Action */}
                                        <TableCell>
                                            <div className="flex justify-end">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        onView(tutor)
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}

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
                    className="px-6"
                />
            )}
        </div>
    );
}