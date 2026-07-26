"use client";

import { Badge } from "@/components/ui/badge";
import { SessionStatus } from "@/constants/booking/BookingSessionStatus";
import { cn } from "@/lib/utils";


type Props = {
  status: SessionStatus;
};

const statusConfig: Record<
  SessionStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING_CONFIRMATION: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  },

  UPCOMING: {
    label: "Upcoming",
    className:
      "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },

  ONGOING: {
    label: "Ongoing",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100",
  },

  MISSED: {
    label: "Missed",
    className:
      "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",
  },
};

export default function SessionStatusBadge({
  status,
}: Props) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(config.className)}
    >
      {config.label}
    </Badge>
  );
}