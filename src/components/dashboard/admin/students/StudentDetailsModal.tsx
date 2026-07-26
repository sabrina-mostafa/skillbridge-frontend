"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";

import FormModal from "@/components/common/FormModal";
import { Badge } from "@/components/ui/badge";

import {
    Calendar,
    Mail,
    Shield,
    User,
    CheckCircle2,
    XCircle,
    LucideIcon,
} from "lucide-react";

import UserStatusBadge from "../UserStatusBadge";
import { User as UserType } from "@/types/user.type";


type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    student: UserType | null;
};

export default function StudentDetailsModal({
    open,
    onOpenChange,
    student,
}: Props) {
    if (!student) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Student Details"
            size="lg"
        >
            <div className="space-y-8">

                {/* Profile Header */}
                <div className="rounded-2xl border bg-muted/30 p-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-22 w-22 overflow-hidden rounded-full border-2 border-background shadow-sm">
                            {student.image ? (
                                <Image
                                    src={student.image}
                                    alt={student.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
                                    {student.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="mt-5 text-lg font-semibold tracking-tight sm:text-2xl">
                            {student.name}
                        </h2>

                        <p className="mt-1 text-muted-foreground">
                            {student.email}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <Badge variant="secondary">
                                Student
                            </Badge>

                            <UserStatusBadge
                                status={student.status}
                            />
                        </div>
                    </div>
                </div>

                {/* Student Information */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Student Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard
                            icon={Mail}
                            label="Email"
                            value={student.email}
                            iconClassName="text-blue-600"
                        />

                        <InfoCard
                            icon={User}
                            label="Role"
                            value="Student"
                            iconClassName="text-indigo-600"
                        />

                        <InfoCard
                            icon={Calendar}
                            label="Joined"
                            value={format(
                                new Date(student.createdAt),
                                "dd MMM yyyy"
                            )}
                            subtitle={formatDistanceToNow(
                                new Date(student.createdAt),
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
                                            status={student.status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Account Status */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Account Status
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <BooleanCard
                            label="Email Verified"
                            value={student.emailVerified}
                            trueText="Verified"
                            falseText="Not Verified"
                        />

                        <BooleanCard
                            label="Profile Completed"
                            value={student.profileCompleted}
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