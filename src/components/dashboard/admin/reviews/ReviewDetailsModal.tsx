"use client";

import Image from "next/image";
import {
    format,
    formatDistanceToNow,
} from "date-fns";
import {
    Star,
    BookOpen,
    Calendar,
    MessageSquare,
    LucideIcon,
} from "lucide-react";

import FormModal from "@/components/common/FormModal";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types/review.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    review: Review | null;
};

export default function ReviewDetailsModal({
    open,
    onOpenChange,
    review,
}: Props) {
    if (!review) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Review Details"
            size="lg"
            className="max-h-[80vh]"
        >
            <div className="space-y-8">
                {/* Header */}
                <div className="rounded-2xl border bg-muted/30 p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-2">
                            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />

                            <span className="text-3xl font-bold">
                                {review.rating.toFixed(1)}
                            </span>
                        </div>

                        <p className="mt-2 text-muted-foreground">
                            {format(
                                new Date(review.createdAt),
                                "dd MMM yyyy"
                            )}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(
                                new Date(review.createdAt),
                                { addSuffix: true }
                            )}
                        </p>

                        <Badge className="mt-4">
                            {review.booking.category.name}
                        </Badge>
                    </div>
                </div>

                {/* Student & Tutor */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Participants
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <ProfileCard
                            title="Student"
                            image={review.student.user.image}
                            name={review.student.user.name}
                            subtitle={review.student.education}
                        />

                        <ProfileCard
                            title="Tutor"
                            image={review.tutor.user.image}
                            name={review.tutor.user.name}
                            subtitle={review.tutor.education}
                        />
                    </div>
                </section>

                {/* Review */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Review
                    </h3>

                    <InfoCard
                        icon={MessageSquare}
                        label="Comment"
                        value={
                            review.comment ||
                            "No comment provided."
                        }
                        iconClassName="text-indigo-600"
                    />
                </section>

                {/* Booking */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Booking Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard
                            icon={BookOpen}
                            label="Category"
                            value={review.booking.category.name}
                            iconClassName="text-blue-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Session Date"
                            value={format(
                                new Date(review.booking.date),
                                "dd MMM yyyy"
                            )}
                            subtitle={`${format(
                                new Date(review.booking.startTime),
                                "hh:mm a"
                            )} - ${format(
                                new Date(review.booking.endTime),
                                "hh:mm a"
                            )}`}
                            iconClassName="text-amber-600"
                        />
                    </div>
                </section>
            </div>
        </FormModal>
    );
}

type ProfileCardProps = {
    title: string;
    image?: string | null;
    name: string;
    subtitle?: string | null;
};

function ProfileCard({
    title,
    image,
    name,
    subtitle,
}: ProfileCardProps) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-bold text-primary-foreground">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {title}
                    </p>

                    <p className="font-semibold">
                        {name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {subtitle || "—"}
                    </p>
                </div>
            </div>
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
        <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-3">
                    <Icon className={`h-4 w-4 ${iconClassName}`} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 whitespace-pre-wrap font-semibold">
                        {value}
                    </p>

                    {subtitle && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}