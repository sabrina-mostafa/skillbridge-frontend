"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { PublicContactMessages } from "@/types/public-contact-form.type";
import { adminClientService } from "@/services/admin/admin.client.service";



type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message: PublicContactMessages | null;
};


export default function DeleteMessageDialog({
    open,
    onOpenChange,
    message,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!message) return;

        startTransition(async () => {
            try {
                const result =
                    await adminClientService.deleteMessage(
                        message.id
                    );

                if (result.error) {
                    throw new Error(
                        result.error.message
                    );
                }
                toast.success("Message deleted successfully");

                onOpenChange(false);

                router.refresh();

            } catch (error: unknown) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to delete message"
                );
            }
        });
    };


    return (
        <ConfirmDeleteModal
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={handleDelete}
            loading={isPending}
            title="Delete Message"
            description="Are you sure you want to delete this contact message? This action cannot be undone."
        >
            {message && (
                <div className="w-full rounded-lg border bg-muted/50 p-3 text-left">
                    <p className="font-medium">
                        {message.fullName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {message.email}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {message.message}
                    </p>
                </div>
            )}
        </ConfirmDeleteModal>
    );
}