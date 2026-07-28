"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/common/FormModal";
import UserAvatar from "@/components/common/UserAvatar";

import {
    Calendar,
    Clock,
    GraduationCap,
    BriefcaseBusiness,
} from "lucide-react";

import { Booking } from "@/types/booking.types";

import SessionInfoItem from "../student/session/SessionInfoItem";
import SessionStatusBadge from "../student/session/SessionStatusBadge";
import MeetingLinkCard from "./MeetingLinkCard";

import {
    canJoinSession,
    formatSessionDate,
    formatSessionTime,
    getSessionDuration,
    getSessionStatus,
} from "@/utils/session/sessionStatus.utils";
import { USER_ROLES, UserRoles } from "@/constants/user/UserRoles";


export type TutorStudentRole = Exclude<
    UserRoles,
    typeof USER_ROLES.ADMIN
>;

type Props = {
    booking: Booking | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    viewerRole: TutorStudentRole;
};

export default function SessionDetailsModal({
    booking,
    open,
    onOpenChange,
    viewerRole
}: Props) {
    if (!booking) return null;

    const sessionStatus = getSessionStatus(booking);
    const meetingLink = booking.meetingLink;

    const person =
        viewerRole === USER_ROLES.STUDENT
            ? booking.tutor.user
            : booking.student.user;

    const title =
        viewerRole === USER_ROLES.STUDENT
            ? "Tutor Information"
            : "Student Information";

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Session Details"
            size="lg"
        >
            {/* Tutor */}
            <section>
                <h3 className="font-semibold mb-4">
                    {title}
                </h3>

                <div className="border p-4 rounded-2xl flex items-start gap-4">
                    <div className="grid gap-2">
                        <div className="flex gap-2">
                            <UserAvatar
                                name={person.name}
                                image={person.image}
                                className="size-14"
                            />
                            <div>
                                <h4 className="font-semibold text-lg">
                                    {person.name}
                                </h4>
                                <p className="text-muted-foreground">
                                    {person.email}
                                </p>
                            </div>
                        </div>

                        {viewerRole === USER_ROLES.STUDENT && (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="size-4 text-primary" />
                                    <span className="text-sm">
                                        {booking.tutor.education}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BriefcaseBusiness className="size-4 text-primary" />
                                    <span className="text-sm">
                                        {booking.tutor.experience}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Separator className="my-6" />

            {/* Session */}
            <section>
                <h3 className="font-semibold mb-5">
                    Session Information
                </h3>

                <div className="border rounded-2xl p-4 grid gap-6 sm:grid-cols-2">
                    <SessionInfoItem label="Course">
                        {booking.category.name}
                    </SessionInfoItem>

                    <SessionInfoItem label="Status">
                        <SessionStatusBadge status={sessionStatus} />
                    </SessionInfoItem>

                    <SessionInfoItem label="Date">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-primary" />
                            {formatSessionDate(booking)}
                        </div>
                    </SessionInfoItem>

                    <SessionInfoItem label="Time">
                        <div className="flex items-center gap-2">
                            <Clock className="size-4 text-primary" />
                            {formatSessionTime(booking)}
                        </div>
                    </SessionInfoItem>

                    <SessionInfoItem label="Duration">
                        {getSessionDuration(booking)} minutes
                    </SessionInfoItem>
                </div>
            </section>

            <Separator className="my-6" />

            {/* Meeting */}
            <section>
                <h3 className="font-semibold mb-5">
                    Meeting Information
                </h3>

                <MeetingLinkCard
                    meetingType={booking.meetingType}
                    meetingLink={booking.meetingLink}
                    canJoin={canJoinSession(booking)}
                />
            </section>

            {/* Footer */}
            <div className="border-t mt-6 pt-6 flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                >
                    Close
                </Button>

                {canJoinSession(booking) && meetingLink && (
                    <Button
                        onClick={() =>
                            window.open(meetingLink, "_blank")
                        }
                    >
                        Join Session
                    </Button>
                )}
            </div>
        </FormModal>
    );
}