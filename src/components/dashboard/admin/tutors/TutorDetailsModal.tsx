"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";

import FormModal from "@/components/common/FormModal";
import { Badge } from "@/components/ui/badge";

import {
    Calendar,
    GraduationCap,
    Mail,
    Shield,
    Star,
    BookOpen,
    Briefcase,
    CheckCircle2,
    XCircle,
    LucideIcon,
} from "lucide-react";

import UserStatusBadge from "../UserStatusBadge";
import { User } from "@/types/user.type";


type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tutor: User | null;
};

export default function TutorDetailsModal({
    open,
    onOpenChange,
    tutor,
}: Props) {
    if (!tutor) return null;

    const categories = tutor?.tutorProfile?.categories ?? [];

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Tutor Details"
            size="lg"
        >
            <div className="space-y-8">

                {/* Profile Header */}
                <div className="rounded-2xl border bg-muted/30 p-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-22 w-22 overflow-hidden rounded-full border-2 border-background shadow-sm">
                            {tutor.image ? (
                                <Image
                                    src={tutor.image}
                                    alt={tutor.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
                                    {tutor.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="mt-5 text-lg sm:text-2xl font-semibold tracking-tight">
                            {tutor.name}
                        </h2>

                        <p className="mt-1 text-muted-foreground">
                            {tutor.email}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <Badge variant="secondary">
                                Tutor
                            </Badge>

                            <UserStatusBadge
                                status={tutor.status}
                            />

                            {tutor?.tutorProfile?.isFeatured && (
                                <Badge>
                                    Featured
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tutor Information */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Tutor Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard
                            icon={Star}
                            label="Average Rating"
                            value={`${tutor?.tutorProfile?.avgRating.toFixed(1)} ⭐`}
                            subtitle={`${tutor?.tutorProfile?.totalReviews} reviews`}
                            iconClassName="text-yellow-500"
                        />

                        <InfoCard
                            icon={GraduationCap}
                            label="Hourly Rate"
                            value={`৳${tutor?.tutorProfile?.hourlyRate}/hour`}
                            iconClassName="text-green-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Joined"
                            value={format(
                                new Date(tutor.createdAt),
                                "dd MMM yyyy"
                            )}
                            subtitle={formatDistanceToNow(
                                new Date(tutor.createdAt),
                                {
                                    addSuffix: true,
                                }
                            )}
                            iconClassName="text-amber-600"
                        />

                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-muted p-3">
                                    <Shield className="h-4 w-4 text-blue-600" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Account Status
                                    </p>

                                    <div className="mt-2">
                                        <UserStatusBadge
                                            status={tutor.status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Teaching Categories
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {categories.length > 0 ? (
                            categories.map((item) => (
                                <Badge
                                    key={item.category.id}
                                    variant="secondary"
                                >
                                    {item.category.name}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No categories assigned.
                            </p>
                        )}
                    </div>
                </section>

                {/* Professional Information */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Professional Information
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-3">
                        <TextCard
                            icon={BookOpen}
                            title="Education"
                            value={tutor?.tutorProfile?.education}
                        />

                        <TextCard
                            icon={Briefcase}
                            title="Experience"
                            value={tutor?.tutorProfile?.experience}
                        />

                        <TextCard
                            icon={Mail}
                            title="Bio"
                            value={tutor?.tutorProfile?.bio}
                        />
                    </div>
                </section>

                {/* Status */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Tutor Status
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <BooleanCard
                            label="Featured Tutor"
                            value={tutor?.tutorProfile!.isFeatured}
                            trueText="Featured"
                            falseText="Not Featured"
                        />

                        <BooleanCard
                            label="Profile Completed"
                            value={tutor.profileCompleted}
                            trueText="Completed"
                            falseText="Incomplete"
                        />
                    </div>
                </section>
            </div>
        </FormModal>
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

                <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 font-semibold">
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

type TextCardProps = {
    title: string;
    value?: string;
    icon: LucideIcon;
};

function TextCard({
    title,
    value,
    icon: Icon,
}: TextCardProps) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />

                <h4 className="font-medium">
                    {title}
                </h4>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {value || "Not provided"}
            </p>
        </div>
    );
}

type BooleanCardProps = {
    label: string;
    value: boolean;
    trueText: string;
    falseText: string;
};

function BooleanCard({
    label,
    value,
    trueText,
    falseText,
}: BooleanCardProps) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">
                        {label}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {value ? trueText : falseText}
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