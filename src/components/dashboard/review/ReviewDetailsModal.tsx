"use client";

import {
    CalendarDays,
    GraduationCap,
    UserRound,
    MessageSquareQuote,
    ArrowRight,
} from "lucide-react";

import FormModal from "@/components/common/FormModal";
import UserAvatar from "@/components/common/UserAvatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Review } from "@/types/review.type";
import { USER_ROLES, UserRoles } from "@/constants/user/UserRoles";

type Props = {
    review: Review | null;
    role: Exclude<UserRoles, typeof USER_ROLES.ADMIN>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function ReviewDetailsModal({
    review,
    role,
    open,
    onOpenChange,
}: Props) {
    if (!review) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Review Details"
            size="lg"
        >
            <div className="space-y-8">

                {/* Participants */}
                <div className="rounded-2xl border bg-gradient-to-br from-primary/[0.04] via-background to-primary/[0.02] px-4 py-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        {/* Student */}
                        <div className="flex flex-1 items-center gap-4 rounded-xl border bg-background/70 p-5 backdrop-blur-sm">
                            <UserAvatar
                                name={review.student.user.name}
                                image={review.student.user.image}
                                className="h-14 w-14"
                            />

                            <div className="min-w-0">
                                <span className="mb-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-primary">
                                    Student
                                </span>
                                <h3 className="truncate text-sm font-semibold">
                                    {review.student.user.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Review Author
                                </p>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="hidden md:flex items-center justify-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-primary shadow-sm">
                                <ArrowRight className="h-5 w-5 text-primary" />
                            </div>
                        </div>

                        {/* Tutor */}
                        <div className="flex flex-1 items-center gap-4 rounded-xl border bg-background/70 p-5 backdrop-blur-sm">
                            <UserAvatar
                                name={review.tutor.user.name}
                                image={review.tutor.user.image}
                                className="h-14 w-14"
                            />

                            <div className="min-w-0">
                                <span className="mb-1 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                    Tutor
                                </span>
                                <h3 className="truncate text-sm font-semibold">
                                    {review.tutor.user.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Course Instructor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Course
                            </span>
                        </div>

                        <p className="font-semibold">
                            {review.booking.category.name}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Reviewed On
                            </span>
                        </div>

                        <p className="font-semibold">
                            {new Date(review.createdAt).toLocaleDateString(
                                undefined,
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <UserRound className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Last Updated
                            </span>
                        </div>

                        <p className="font-semibold">
                            {new Date(review.updatedAt).toLocaleDateString(
                                undefined,
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <MessageSquareQuote className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Review Status
                            </span>
                        </div>

                        <Badge>Published</Badge>
                    </div>
                </div>

                {/* Review */}
                <div>
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <MessageSquareQuote className="h-5 w-5 text-primary" />

                        {role === USER_ROLES.STUDENT
                            ? "Your Feedback"
                            : "Student Feedback"}
                    </h4>

                    <div className="rounded-2xl border bg-muted/30 p-6">
                        {review.comment ? (
                            <p className="leading-6 text-sm">
                                &ldquo;{review.comment}&rdquo;
                            </p>
                        ) : (
                            <p className="italic text-muted-foreground">
                                No written feedback was provided.
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t pt-6">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="min-w-28 cursor-pointer"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </FormModal>
    );
}