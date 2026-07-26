"use client";

import {
    GraduationCap,
    Mail,
    UserRound,
    BriefcaseBusiness,
    Banknote,
} from "lucide-react";
import FormModal from "@/components/common/FormModal";
import UserAvatar from "@/components/common/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentTutor } from "@/types/tutor-student.type";


type Props = {
    tutor: StudentTutor | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function TutorDetailsModal({
    tutor,
    open,
    onOpenChange,
}: Props) {
    if (!tutor) return null;

    const completion =
        tutor.totalSessions === 0
            ? 0
            : Math.round(
                (tutor.completedSessions /
                    tutor.totalSessions) *
                100
            );

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Tutor Details"
            size="lg"
        >
            <div className="space-y-8">

                {/* Hero */}
                <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                        <UserAvatar
                            name={tutor.tutor.user.name}
                            image={tutor.tutor.user.image}
                            className="h-24 w-24 border-4 border-background shadow-lg"
                        />
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {tutor.tutor.user.name}
                            </h2>

                            <p className="mt-1 text-muted-foreground">
                                Professional Tutor
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Badge className="rounded-full px-4 py-1">
                                    Tutor
                                </Badge>

                                <Badge variant="secondary" className="rounded-full px-4 py-1">
                                    {tutor.totalSessions} Sessions
                                </Badge>

                                <Badge variant="outline" className="rounded-full px-4 py-1">
                                    {tutor.completedSessions} Completed
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="rounded-2xl w-full border bg-card">
                    <div className="border-b px-6 py-4">
                        <h3 className="font-semibold">
                            Tutor Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Professional profile and teaching information
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 divide-x divide-y">
                        <InfoRow
                            icon={Mail}
                            label="Email"
                            value={tutor.tutor.user.email}
                        />

                        <InfoRow
                            icon={GraduationCap}
                            label="Education"
                            value={tutor.tutor.education}
                        />

                        <InfoRow
                            icon={BriefcaseBusiness}
                            label="Experience"
                            value={tutor.tutor.experience}
                        />

                        <InfoRow
                            icon={Banknote}
                            label="Hourly Rate"
                            value={`৳${tutor.tutor.hourlyRate}/hr`}
                        />
                    </div>
                </div>

                {/* Statistics */}
                <div className="rounded-2xl border bg-card">
                    <div className="border-b px-6 py-4">
                        <h3 className="font-semibold">
                            Session Statistics
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Learning activity overview
                        </p>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-y">
                        <StatItem
                            label="Total Sessions"
                            value={tutor.totalSessions}
                        />

                        <StatItem
                            label="Completed"
                            value={tutor.completedSessions}
                        />

                        <StatItem
                            label="Upcoming"
                            value={tutor.upcomingSessions}
                        />

                        <StatItem
                            label="Reviews"
                            value={tutor.bookings.filter(b => b.review).length}
                        />
                    </div>
                </div>

                {/* Learning Journey */}
                <div className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Learning Journey
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Your learning progress with this tutor
                            </p>
                        </div>

                        <div className="text-right">

                            <p className="text-3xl font-bold">
                                {completion}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Completion Rate
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span>
                                {tutor.completedSessions} of {tutor.totalSessions} sessions completed
                            </span>

                            <span className="text-muted-foreground">
                                {completion}%
                            </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-500"
                                style={{
                                    width: `${completion}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {tutor.tutor.bio && (
                    <div>
                        <div className="mb-5 flex items-center">
                            <UserRound className="mr-2 h-5 w-5 text-primary" />
                            <h3 className="font-semibold">
                                About Tutor
                            </h3>
                            <div className="ml-5 h-px flex-1 bg-border" />
                        </div>

                        <div className="rounded-2xl border bg-muted/40 p-6 leading-8 text-sm text-muted-foreground">
                            {tutor.tutor.bio}
                        </div>
                    </div>

                )}

                {/* Footer */}
                <div className="flex justify-end border-t pt-6">
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-xl px-8"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </FormModal>
    );
}


function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        {label}
                    </p>
                    <p className="font-semibold">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}


function StatItem({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">
                    {value}
                </span>

                <span className="pb-1 text-xs text-muted-foreground">
                    sessions
                </span>
            </div>
        </div>
    );
}
