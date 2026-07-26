"use client";

import { useEffect, useMemo, useState } from "react";
import SessionTable from "./SessionTable";
import { Booking } from "@/types/booking.types";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { format } from "date-fns";
import { toast } from "sonner";
import SectionHeader from "@/components/common/SectionHeader";
import SessionFilters from "../../tutor/session/SessionFilters";
import { getSessionSummary } from "@/utils/session/sessionSummary.utils";
import { SessionStatus } from "@/constants/booking/BookingSessionStatus";
import SessionManagerSkeleton from "@/components/skeletons/SessionManagerSkeleton";
import SessionSummary from "../../student/session/SessionSummary";
import SessionDetailsModal from "../../common/SessionDetailsModal";
import { User } from "@/types/user.type";
import { USER_ROLES } from "@/constants/user/UserRoles";



export type TutorStudentUser = User & {
    role: typeof USER_ROLES.TUTOR | typeof USER_ROLES.STUDENT;
};

export default function SessionManager({ user }: { user: TutorStudentUser }) {
    const [sessions, setSessions] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSession, setSelectedSession] = useState<Booking | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const [meetingType, setMeetingType] = useState("");
    const [sessionStatus, setSessionStatus] = useState<SessionStatus | "">("");

    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const [meta, setMeta] = useState({
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 1,
    });

    const summary = useMemo(
        () => getSessionSummary(sessions),
        [sessions]
    );

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);

                const res = await bookingClientService.getMine({
                    page,
                    limit: 8,

                    meetingType: meetingType || undefined,
                    sessionStatus: sessionStatus || undefined,

                    startDate: startDate
                        ? format(startDate, "yyyy-MM-dd")
                        : undefined,

                    endDate: endDate
                        ? format(endDate, "yyyy-MM-dd")
                        : undefined,

                    sortBy: "date",
                    sortOrder: "desc",
                });

                if (res.error || !res.data) {
                    toast.error(res.error ?? "Failed to load sessions");
                    return;
                }

                setSessions(res.data.data);
                setMeta(res.data.meta);
            } catch {
                toast.error("Failed to load sessions");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [page, sessionStatus, meetingType, startDate, endDate]);

    // useEffect(() => {
    //     setPage(1);
    // }, [
    //     sessionStatus,
    //     meetingType,
    //     startDate,
    //     endDate,
    // ]);


    if (loading) {
        return <SessionManagerSkeleton />;
    }

    // if (!loading && sessions.length === 0) {
    //     return (
    //         <EmptyState
    //             icon={<CalendarDays className="h-8 w-8 text-muted-foreground" />}
    //             title="No sessions found"
    //             description="You don't have any sessions matching the selected filters."
    //         />
    //     );
    // }


    return (
        <div className="space-y-8">
            <SectionHeader
                title="My Sessions"
                description="View your upcoming and completed tutoring sessions."
            />

            <SessionSummary
                upcoming={summary.upcoming}
                ongoing={summary.ongoing}
                today={summary.today}
                completed={summary.completed}
            />

            <SessionFilters
                sessionStatus={sessionStatus}
                meetingType={meetingType}
                startDate={startDate}
                endDate={endDate}
                onSessionStatusChange={setSessionStatus}
                onMeetingTypeChange={setMeetingType}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onClear={() => {
                    setSessionStatus("");
                    setMeetingType("");
                    setStartDate(undefined);
                    setEndDate(undefined);
                    setPage(1);
                }}
            />

            <SessionTable
                data={sessions}
                page={page}
                setPage={setPage}
                meta={meta}
                onView={(booking) => {
                    setSelectedSession(booking);
                    setDetailsOpen(true);
                }}
            />

            <SessionDetailsModal
                booking={selectedSession}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                viewerRole={user.role}
            />
        </div>
    )
}