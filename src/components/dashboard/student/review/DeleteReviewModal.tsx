"use client";

import { useState } from "react";
import {
    AlertTriangle,
    Loader2,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import FormModal from "@/components/common/FormModal";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/review.type";
import { reviewClientService } from "@/services/review/review.client.service";


type Props = {
    review: Review | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
};

export default function DeleteReviewModal({
    review,
    open,
    onOpenChange,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    if (!review) return null;

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await reviewClientService.deleteReview(
                review.id
            );

            if (res.error) {
                toast.error(res.error);
                return;
            }

            toast.success("Review deleted successfully.");

            onOpenChange(false);
            onSuccess?.();
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Delete Review"
            // description="This action permanently removes your review."
            size="md"
        >
            <div className="space-y-6">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                        <Trash2 className="h-8 w-8 text-destructive" />
                    </div>
                </div>

                {/* Warning */}
                <div className="space-y-3 text-center">
                    <h3 className="text-xl font-semibold">
                        Permanently delete this review?
                    </h3>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Your rating and feedback will be removed from this
                        tutor&apos;s profile and cannot be recovered.
                    </p>
                </div>

                {/* Warning Box */}
                <div className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

                    <div>
                        <p className="font-medium text-destructive">
                            This action cannot be undone
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Once deleted, your review and rating will
                            be permanently removed.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button
                        variant="outline"
                        disabled={loading}
                        onClick={() => onOpenChange(false)}
                    >
                        Keep Review
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        Delete Review
                    </Button>
                </div>
            </div>
        </FormModal>
    );
}