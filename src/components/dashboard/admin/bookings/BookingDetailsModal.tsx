"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import {
    Calendar,
    Clock3,
    GraduationCap,
    User,
    Video,
    FolderOpen,
    CheckCircle2,
    XCircle,
    LucideIcon,
} from "lucide-react";
import FormModal from "@/components/common/FormModal";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking.types";
import BookingStatusBadge from "./BookingStatusBadge";



type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Booking | null;
};

export default function BookingDetailsModal({
    open,
    onOpenChange,
    booking,
}: Props) {
    if (!booking) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Booking Details"
            size="lg"
            className="max-h-[80vh]"
        >
            <div className="space-y-8">
                {/* Header */}
                <div className="rounded-2xl border bg-muted/30 p-5">
                    <div className="flex flex-col items-center text-center">

                        <div className="flex -space-x-4">

                            <Avatar
                                image={booking.student.user.image}
                                name={booking.student.user.name}
                            />

                            <Avatar
                                image={booking.tutor.user.image}
                                name={booking.tutor.user.name}
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            {booking.category.name}
                        </h2>

                        <p className="text-muted-foreground">
                            {booking.student.user.name} • {booking.tutor.user.name}
                        </p>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <BookingStatusBadge
                                status={booking.status}
                            />

                            {booking.meetingType && (
                                <Badge variant="secondary">
                                    {booking.meetingType}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Participants */}
                <section className="space-y-3">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Participants
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={User}
                            label="Student"
                            value={booking.student.user.name}
                            subtitle={booking.student.user.email}
                            iconClassName="text-blue-600"
                        />

                        <InfoCard
                            icon={GraduationCap}
                            label="Tutor"
                            value={booking.tutor.user.name}
                            subtitle={booking.tutor.user.email}
                            iconClassName="text-indigo-600"
                        />

                    </div>
                </section>

                {/* Booking */}
                <section className="space-y-3">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Booking Information
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={FolderOpen}
                            label="Category"
                            value={booking.category.name}
                            iconClassName="text-violet-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Date"
                            value={format(
                                new Date(booking.date),
                                "dd MMM yyyy"
                            )}
                            iconClassName="text-amber-600"
                        />

                        <InfoCard
                            icon={Clock3}
                            label="Session Time"
                            value={`${format(
                                new Date(booking.startTime),
                                "hh:mm a"
                            )} - ${format(
                                new Date(booking.endTime),
                                "hh:mm a"
                            )}`}
                            iconClassName="text-emerald-600"
                        />

                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex items-start gap-3">

                                <div className="rounded-lg bg-muted p-3">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Booking Status
                                    </p>

                                    <div className="mt-2">
                                        <BookingStatusBadge
                                            status={booking.status}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* Meeting */}
                <section className="space-y-3">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Meeting
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={Video}
                            label="Meeting Type"
                            value={booking.meetingType ?? "Not Assigned"}
                            iconClassName="text-red-500"
                        />

                        <div className="rounded-xl border bg-card p-4 shadow-sm">

                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                Meeting Link
                            </p>

                            {booking.meetingLink ? (
                                <a
                                    href={booking.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 block break-all text-sm text-primary underline"
                                >
                                    Join Meeting
                                </a>
                            ) : (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Not Available
                                </p>
                            )}

                        </div>

                    </div>
                </section>

                {/* Review */}
                <section className="space-y-3">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Review
                    </h3>

                    <BooleanCard
                        label="Review Submitted"
                        value={!!booking.review}
                    />

                </section>

                {/* Metadata */}
                <section className="space-y-3">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Metadata
                    </h3>

                    <InfoCard
                        icon={Calendar}
                        label="Created"
                        value={format(
                            new Date(booking.createdAt),
                            "dd MMM yyyy"
                        )}
                        subtitle={formatDistanceToNow(
                            new Date(booking.createdAt),
                            {
                                addSuffix: true,
                            }
                        )}
                        iconClassName="text-orange-600"
                    />

                </section>
            </div>
        </FormModal>
    );
}

function Avatar({
    image,
    name,
}: {
    image?: string | null;
    name: string;
}) {
    return (
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-background shadow">

            {image ? (
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-primary-foreground">
                    {name.charAt(0)}
                </div>
            )}

        </div>
    );
}

type InfoCardProps = {
    label: string;
    value: string;
    subtitle?: string;
    icon: LucideIcon;
    iconClassName?: string;
};

function InfoCard({
    label,
    value,
    subtitle,
    icon: Icon,
    iconClassName,
}: InfoCardProps) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">

            <div className="flex items-start gap-3">

                <div className="rounded-lg bg-muted p-3">
                    <Icon className={`h-4 w-4 ${iconClassName}`} />
                </div>

                <div className="min-w-0">

                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 font-semibold break-words">
                        {value}
                    </p>

                    {subtitle && (
                        <p className="mt-1 text-sm text-muted-foreground break-all">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

function BooleanCard({
    label,
    value,
}: {
    label: string;
    value: boolean;
}) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="font-medium">
                        {label}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {value ? "Available" : "Not Available"}
                    </p>

                </div>

                {value ? (
                    <Badge className="gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Yes
                    </Badge>
                ) : (
                    <Badge
                        variant="secondary"
                        className="gap-1"
                    >
                        <XCircle className="h-3.5 w-3.5" />
                        No
                    </Badge>
                )}

            </div>

        </div>
    );
}