"use client";

import {
  Video,
  MonitorSmartphone,
  Globe,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  type: string | null | undefined;
};

const meetingConfig = {
  GOOGLE_MEET: {
    label: "Google Meet",
    icon: Video,
    className:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
  },

  ZOOM: {
    label: "Zoom",
    icon: Video,
    className:
      "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  },

  MICROSOFT_TEAMS: {
    label: "Microsoft Teams",
    icon: MonitorSmartphone,
    className:
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50",
  },

  UNKNOWN: {
    label: "Unknown",
    icon: Globe,
    className:
      "bg-muted text-muted-foreground border-border",
  },
} as const;

export default function MeetingTypeBadge({
  type,
}: Props) {
  const config =
    meetingConfig[
      (type as keyof typeof meetingConfig) ?? "UNKNOWN"
    ] ?? meetingConfig.UNKNOWN;

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5", config.className)}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}