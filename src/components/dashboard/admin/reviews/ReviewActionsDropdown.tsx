"use client";

import {
    Eye,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Review } from "@/types/review.type";

type Props = {
    review: Review;
    onView: () => void;
    onDelete: () => void;
};

export default function ReviewActionsDropdown({
    onView,
    onDelete,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-52"
            >
                <DropdownMenuItem
                    onClick={onView}
                    className="cursor-pointer"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={onDelete}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Review
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}