"use client";

import {
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";



type Props = {
    onViewDetails: () => void;
    onEdit: () => void;
    onDelete: () =>void;
};

export default function CategoryActionsDropdown({
    onViewDetails,
    onEdit,
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
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-48"
            >
                <DropdownMenuItem onClick={onViewDetails}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Category
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Category
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}