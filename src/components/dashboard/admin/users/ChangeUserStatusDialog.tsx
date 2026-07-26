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

import { USER_STATUS, UserStatus } from "@/constants/user/UserStatus";
import { adminClientService } from "@/services/admin/admin.client.service";
import { User } from "@/types/user.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
};

export default function ChangeUserStatusDialog({
    open,
    onOpenChange,
    user,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<UserStatus>(USER_STATUS.ACTIVE);

    if (!user) return null;

    function handleUpdate() {
        if (!user) return;

        startTransition(async () => {
            const res = await adminClientService.updateUserStatus(user.id, status);

            if (res.error) {
                toast.error(res.error.message);
                return;
            }

            toast.success("User status updated successfully.");

            onOpenChange(false);
            router.refresh();
        });
    }

    return (
        <FormModal
            open={open}
            onOpenChange={(nextOpen) => {
                if (nextOpen && user) {
                    setStatus(user.status);
                }

                onOpenChange(nextOpen);
            }}
            title="Update User Status"
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
                        className="cursor-pointer"
                        disabled={isPending || status === user.status}
                        variant={
                            status === USER_STATUS.BLOCKED
                                ? "destructive"
                                : "default"
                        }
                    >
                        {isPending ? "Updating..." : "Save Changes"}
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* User Card */}
                <div className="rounded-xl border bg-muted/40 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h3 className="truncate font-semibold">
                                {user.name}
                            </h3>

                            <p className="truncate text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === USER_STATUS.ACTIVE
                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                }`}
                        >
                            {user.status}
                        </span>
                    </div>
                </div>

                {/* Status */}
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
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={USER_STATUS.ACTIVE}>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <span className="py-1">Active</span>
                                </div>
                            </SelectItem>

                            <SelectItem value={USER_STATUS.BLOCKED}>
                                <div className="flex items-center gap-2">
                                    <Ban className="h-4 w-4 text-red-600" />
                                    <span className="py-1">Blocked</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <p className="text-xs text-muted-foreground">
                        Active users can access the platform. Blocked users cannot sign in
                        until their account is reactivated.
                    </p>
                </div>

                {status === USER_STATUS.BLOCKED && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                        <div className="flex items-start gap-3">
                            <Ban className="mt-0.5 h-5 w-5 text-destructive" />

                            <div>
                                <p className="font-medium text-destructive">
                                    Block User
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    This user will no longer be able to sign in or use the
                                    platform until an administrator changes their status back to
                                    <strong> Active</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormModal>
    );
}