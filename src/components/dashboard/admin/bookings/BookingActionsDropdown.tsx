"use client";

import {
    MoreHorizontal,
    Eye,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "@/types/booking.types";

type Props = {
    booking: Booking;
    onView: () => void;
    onStatus: () => void;
};

export default function BookingActionsDropdown({
    booking,
    onView,
    onStatus,
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
                    onClick={onStatus}
                    className="cursor-pointer"
                    disabled={
                        booking.status === "COMPLETED" ||
                        booking.status === "CANCELLED" ||
                        booking.status === "DECLINED"
                    }
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Update Status
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}