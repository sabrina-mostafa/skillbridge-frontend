"use client";

import {
    MoreHorizontal,
    Eye,
    UserRound,
    UserX,
    UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { USER_ROLES } from "@/constants/user/UserRoles";

type User = {
    id: string;
    name: string;
    role: string;
    status: string;
};

type Props = {
    user: User;
    onViewDetails: () => void;
    onViewProfile: () => void;
    onToggleStatus: () => void;
};

export default function UserActionsDropdown({
    user,
    onViewDetails,
    onViewProfile,
    onToggleStatus,
}: Props) {
    const isActive = user.status === "ACTIVE";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md hover:bg-muted cursor-pointer"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Actions
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={onViewDetails}
                    className="cursor-pointer gap-2"
                >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>View Details</span>
                </DropdownMenuItem>

                {user.role === USER_ROLES.TUTOR && (
                    <DropdownMenuItem
                        onClick={onViewProfile}
                        className="cursor-pointer gap-2"
                    >
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        <span>View Tutor Profile</span>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {isActive ? (
                    <DropdownMenuItem
                        onClick={onToggleStatus}
                        className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                    >
                        <UserX className="h-4 w-4" />
                        <span>Suspend User</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={onToggleStatus}
                        className="cursor-pointer gap-2 text-green-600 focus:text-green-600"
                    >
                        <UserCheck className="h-4 w-4" />
                        <span>Activate User</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}