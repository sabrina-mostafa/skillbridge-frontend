import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS, BookingStatus } from "@/constants/booking/BookingStatus";


type BookingStatusProps = {
    status: BookingStatus;
};

const statusConfig: Record<
    BookingStatus,
    {
        label: string;
        variant:
        | "default"
        | "secondary"
        | "destructive"
        | "outline";
    }
> = {
    [BOOKING_STATUS.PENDING]: {
        label: "Pending",
        variant: "outline",
    },
    [BOOKING_STATUS.CONFIRMED]: {
        label: "Confirmed",
        variant: "default",
    },
    [BOOKING_STATUS.COMPLETED]: {
        label: "Completed",
        variant: "secondary",
    },
    [BOOKING_STATUS.DECLINED]: {
        label: "Declined",
        variant: "destructive",
    },
    [BOOKING_STATUS.CANCELLED]: {
        label: "Cancelled",
        variant: "destructive",
    },
};

export default function BookingStatusBadge({
    status,
}: BookingStatusProps) {
    const config = statusConfig[status];

    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
}