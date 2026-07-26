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
import { TutorStudent } from "@/types/tutor-student.type";
import StudentEmptyState from "./StudentEmptyState";



type Props = {
    data: TutorStudent[];
    page: number;
    setPage: (page: number) => void;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onView: (student: TutorStudent) => void;
};

export default function StudentTable({
    data,
    page,
    setPage,
    meta,
    onView,
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="rounded-2xl border bg-card shadow-sm">
                <TableHeaderSection
                    title="My Students"
                    description="Students who have booked sessions with you."
                />

                <div className="overflow-x-auto px-2">
                    <Table className="min-w-250">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
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
                                        <StudentEmptyState />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((student) => (
                                    <TableRow key={student.student.id}>

                                        {/* Student */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <UserAvatar
                                                    name={student.student.user.name}
                                                    image={student.student.user.image}
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {student.student.user.name}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Student
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />

                                                {student.student.user.email}
                                            </div>
                                        </TableCell>

                                        {/* Education */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-primary" />
                                                {student.student.education || "-"}
                                            </div>
                                        </TableCell>

                                        {/* Sessions */}
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {student.totalSessions}
                                            </Badge>
                                        </TableCell>

                                        {/* Completed */}
                                        <TableCell>
                                            <Badge>
                                                {student.completedSessions}
                                            </Badge>
                                        </TableCell>

                                        {/* Latest */}
                                        <TableCell>
                                            {student.latestBooking?.date
                                                ? new Date(student.latestBooking.date).toLocaleDateString()
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
                                                        onView(student)
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