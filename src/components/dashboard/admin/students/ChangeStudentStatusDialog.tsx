"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Ban, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import FormModal from "@/components/common/FormModal";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    USER_STATUS,
    UserStatus,
} from "@/constants/user/UserStatus";

import { adminClientService } from "@/services/admin/admin.client.service";
import { User } from "@/types/user.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    student: User | null;
};

export default function ChangeStudentStatusDialog({
    open,
    onOpenChange,
    student,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [status, setStatus] = useState<UserStatus>(
        USER_STATUS.ACTIVE
    );

    if (!student) return null;

    function handleUpdate() {
        if (!student) return;
        
        startTransition(async () => {
            const res =
                await adminClientService.updateUserStatus(
                    student.id,
                    status
                );

            if (res.error) {
                toast.error(res.error.message);
                return;
            }

            toast.success(
                "Student status updated successfully."
            );

            onOpenChange(false);
            router.refresh();
        });
    }

    return (
        <FormModal
            open={open}
            onOpenChange={(nextOpen) => {
                if (nextOpen && student) {
                    setStatus(student.status);
                }

                onOpenChange(nextOpen);
            }}
            title="Update Student Status"
            size="sm"
            footer={
                <>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleUpdate}
                        disabled={
                            isPending ||
                            status === student.status
                        }
                        variant={
                            status === USER_STATUS.BLOCKED
                                ? "destructive"
                                : "default"
                        }
                        className="cursor-pointer"
                    >
                        {isPending
                            ? "Updating..."
                            : "Save Changes"}
                    </Button>
                </>
            }
        >
            <div className="space-y-6">

                {/* Student Card */}
                <div className="rounded-xl border bg-muted/40 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h3 className="truncate font-semibold">
                                {student.name}
                            </h3>

                            <p className="truncate text-sm text-muted-foreground">
                                {student.email}
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${student.status ===
                                    USER_STATUS.ACTIVE
                                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                }`}
                        >
                            {student.status}
                        </span>
                    </div>
                </div>

                {/* Status Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        New Status
                    </label>

                    <Select
                        value={status}
                        onValueChange={(value) =>
                            setStatus(value as UserStatus)
                        }
                    >
                        <SelectTrigger className="mt-2 w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem
                                value={USER_STATUS.ACTIVE}
                            >
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    Active
                                </div>
                            </SelectItem>

                            <SelectItem
                                value={USER_STATUS.BLOCKED}
                            >
                                <div className="flex items-center gap-2">
                                    <Ban className="h-4 w-4 text-red-600" />
                                    Blocked
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <p className="text-xs text-muted-foreground">
                        Blocking a student prevents them from signing in,
                        booking tutors, and accessing the platform until
                        reactivated.
                    </p>
                </div>

                {status === USER_STATUS.BLOCKED && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                        <div className="flex gap-3">
                            <Ban className="mt-0.5 h-5 w-5 text-destructive" />

                            <div>
                                <p className="font-medium text-destructive">
                                    Block Student
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    This student will no longer be able to
                                    sign in, browse tutors, or create new
                                    bookings until their account is
                                    activated again.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormModal>
    );
}