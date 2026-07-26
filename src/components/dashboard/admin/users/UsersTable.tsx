"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user.type";
import UserStatusBadge from "../UserStatusBadge";
import UserActionsDropdown from "./UserActionsDropdown";



type Props = {
    users: User[];
    onViewDetails: (user: User) => void;
    onToggleStatus: (user: User) => void;
    onViewProfile: (user: User) => void;
};

export default function UsersTable({
    users,
    onViewDetails,
    onToggleStatus,
    onViewProfile,
}: Props) {
    return (
        <div className="overflow-hidden p-4 rounded-2xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="py-16 text-center text-muted-foreground"
                            >
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-semibold text-primary">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {user.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {user.role}
                                </TableCell>

                                <TableCell>
                                    <UserStatusBadge
                                        status={user.status}
                                    />
                                </TableCell>

                                <TableCell>
                                    {user.profileCompleted ? (
                                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/40 dark:text-indigo-300">
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                                            Pending
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {format(
                                        new Date(user.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </TableCell>

                                <TableCell>
                                    <UserActionsDropdown
                                        user={user}
                                        onViewDetails={() => onViewDetails(user)}
                                        onViewProfile={() => onViewProfile(user)}
                                        onToggleStatus={() => onToggleStatus(user)}
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