"use client";

import { toast } from "sonner";
import { Copy, ExternalLink, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import MeetingTypeBadge from "./MeetingTypeBadge";

type Props = {
    meetingType?: string | null;
    meetingLink?: string | null;
    canJoin: boolean;
};

export default function MeetingLinkCard({
    meetingType,
    meetingLink,
    canJoin,
}: Props) {
    const handleCopy = async () => {
        if (!meetingLink) return;

        try {
            await navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied.");
        } catch {
            toast.error("Failed to copy meeting link.");
        }
    };

    const handleOpen = () => {
        if (!meetingLink) return;

        window.open(
            meetingLink,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="rounded-xl border bg-muted/30 p-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Meeting Platform
                    </p>

                    <div className="mt-2">
                        <MeetingTypeBadge type={meetingType} />
                    </div>
                </div>
            </div>

            {meetingLink ? (
                <>
                    <div className="rounded-lg bg-background border p-3">
                        <div className="flex items-center gap-2">
                            <Link2 className="h-4 w-4 text-muted-foreground" />

                            <p className="truncate text-sm">
                                {meetingLink}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCopy}
                            className="cursor-pointer"
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                        </Button>

                        <Button
                            type="button"
                            onClick={handleOpen}
                            disabled={!canJoin}
                            className={canJoin ? "cursor-pointer" : "cursor-not-allowed"}
                        >
                            <ExternalLink className="mr-2 h-4 w-4" />

                            {canJoin ? "Join Session" : "Open Link"}
                        </Button>
                    </div>

                    {!canJoin && (
                        <p className="text-xs text-muted-foreground">
                            This meeting cannot be joined at the current
                            session status.
                        </p>
                    )}
                </>
            ) : (
                <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        The tutor hasn&apos;t added a meeting link yet.
                    </p>
                </div>
            )}
        </div>
    );
}