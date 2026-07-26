"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";

import FormModal from "@/components/common/FormModal";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Shield,
    Calendar,
    CheckCircle2,
    XCircle,
    LucideIcon,
} from "lucide-react";

import UserStatusBadge from "../UserStatusBadge";
import { User } from "@/types/user.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
};

export default function UserDetailsModal({
    open,
    onOpenChange,
    user,
}: Props) {
    if (!user) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="User Details"
            size="lg"
        >
            <div className="space-y-8">
                {/* Profile Header */}
                <div className="rounded-2xl border bg-muted/30 p-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-22 w-22 overflow-hidden rounded-full border-2 border-background shadow-sm">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="mt-5 text-lg sm:text-2xl font-semibold tracking-tight">
                            {user.name}
                        </h2>

                        <p className="mt-1 text-muted-foreground">
                            {user.email}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <Badge variant="secondary">
                                {user.role ?? "Not Assigned"}
                            </Badge>

                            <UserStatusBadge
                                status={user.status}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <section className="space-y-3">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Account Information
                        </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard
                            icon={Shield}
                            label="Role"
                            value={user.role ?? "Not Assigned"}
                            iconClassName="text-indigo-600"
                        />

                        <InfoCard
                            icon={Mail}
                            label="Email"
                            value={user.email}
                            iconClassName="text-blue-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Joined"
                            value={format(
                                new Date(user.createdAt),
                                "dd MMM yyyy"
                            )}
                            subtitle={`${formatDistanceToNow(
                                new Date(user.createdAt),
                                { addSuffix: true }
                            )}`}
                            iconClassName="text-amber-600"
                        />

                        <div className="rounded-2xl border bg-card p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-green-500/10 p-2">
                                    <Shield className="h-4 w-4 text-green-600" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Account Status
                                    </p>

                                    <div className="mt-2">
                                        <UserStatusBadge
                                            status={user.status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Verification */}
                <section className="space-y-3">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Verification & Setup
                        </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <BooleanCard
                            label="Email Verification"
                            value={user.emailVerified}
                        />

                        <BooleanCard
                            label="Profile Completion"
                            value={user.profileCompleted}
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

                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-1 truncate font-semibold">
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

type BooleanCardProps = {
    label: string;
    value: boolean;
};

function BooleanCard({
    label,
    value,
}: BooleanCardProps) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">
                        {label}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {value
                            ? "Completed"
                            : "Pending"}
                    </p>
                </div>

                {value ? (
                    <Badge className="gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                    </Badge>
                ) : (
                    <Badge
                        variant="secondary"
                        className="gap-1"
                    >
                        <XCircle className="h-3.5 w-3.5" />
                        Pending
                    </Badge>
                )}
            </div>
        </div>
    );
}