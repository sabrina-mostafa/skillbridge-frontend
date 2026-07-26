"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";

import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { reviewClientService } from "@/services/review/review.client.service";
import { Review } from "@/types/review.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    review: Review | null;
    onSuccess?: () => void;
};

export default function DeleteReviewDialog({
    open,
    onOpenChange,
    review,
    onSuccess,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    if (!review) return null;

    function handleDelete() {
        if (!review) return;

        startTransition(async () => {
            const res = await reviewClientService.deleteReview(review.id);

            if (res.error) {
                toast.error(res.error.message);
                return;
            }

            toast.success("Review deleted successfully.");

            onOpenChange(false);
            onSuccess?.();
            router.refresh();
        });
    }

    return (
        <ConfirmDeleteModal
            open={open}
            onOpenChange={onOpenChange}
            title="Delete Review"
            description="This action permanently removes the review and recalculates the tutor's rating."
            loading={isPending}
            onConfirm={handleDelete}
        >
            <div className="w-full rounded-xl border bg-muted/40 p-4 text-left">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="font-semibold">
                            {review.student.user.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Review for{" "}
                            <span className="font-medium">
                                {review.tutor.user.name}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating.toFixed(1)}
                    </div>
                </div>

                {review.comment && (
                    <blockquote className="mt-4 border-l-2 pl-3 text-sm italic text-muted-foreground">
                        &ldquo;{review.comment}&rdquo;
                    </blockquote>
                )}
            </div>
        </ConfirmDeleteModal>
    );
}