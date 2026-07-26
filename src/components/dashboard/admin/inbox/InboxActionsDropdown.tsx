"use client";

import {
    MoreHorizontal,
    Eye,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { PublicContactMessages } from "@/types/public-contact-form.type";



type Props = {
    message: PublicContactMessages;
    onView: () => void;
    onDelete: () => void;
};

export default function InboxActionsDropdown({
    onView,
    onDelete,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">
                        Open actions
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-40"
            >
                {/* View */}
                <DropdownMenuItem
                    onClick={onView}
                    className="cursor-pointer"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>


                {/* Delete */}
                <DropdownMenuItem
                    onClick={onDelete}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}