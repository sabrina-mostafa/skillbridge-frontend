"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    CheckCircle2,
    Eye,
    ShieldCheck,
    ShieldX,
    XCircle,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import UserStatusBadge from "../UserStatusBadge";

import { User } from "@/types/user.type";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Props = {
    students: User[];

    onViewDetails: (student: User) => void;
    onToggleStatus: (student: User) => void;
};

export default function StudentsTable({
    students,
    onViewDetails,
    onToggleStatus,
}: Props) {
    const completedStudents = students.filter(
        (student) => student.profileCompleted
    );

    if (!completedStudents.length) {
        return (
            <EmptyState
                title="No students found"
                description="No students match the selected filters."
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-card p-2">
            <Table className="min-w-225">
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right pr-4">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {completedStudents.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={
                                            student.image ??
                                            "/images/default-avatar.png"
                                        }
                                        alt={student.name}
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-medium">
                                            {student.name}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {student.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(student.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>

                            <TableCell>
                                {student.emailVerified ? (
                                    <Badge className="gap-1">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        <XCircle className="h-3.5 w-3.5" />
                                        Pending
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell>
                                <UserStatusBadge
                                    status={student.status}
                                />
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() =>
                                            onViewDetails(student)
                                        }
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() =>
                                            onToggleStatus(student)
                                        }
                                    >
                                        {student.status ===
                                            "ACTIVE" ? (
                                            <ShieldX className="h-4 w-4 text-red-500" />
                                        ) : (
                                            <ShieldCheck className="h-4 w-4 text-green-500" />
                                        )}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}