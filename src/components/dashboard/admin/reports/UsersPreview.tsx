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
import { UsersReport } from "@/types/reports.type";



export default function UsersPreview({ users }: { users: UsersReport[] }) {

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>{user.role}</TableCell>

                            <TableCell>{user.status}</TableCell>

                            <TableCell>
                                {format(
                                    new Date(user.createdAt),
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