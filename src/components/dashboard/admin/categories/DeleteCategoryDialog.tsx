"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CategoryDetails } from "@/types/category.type";
import { categoryClientService } from "@/services/category/category.client.service";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: CategoryDetails | null;
};

export default function DeleteCategoryDialog({
    open,
    onOpenChange,
    category,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    if (!category) return null;

    function handleDelete() {
        if (!category) return;

        startTransition(async () => {
            const res = await categoryClientService.delete(
                category.id
            );

            if (res.error) {
                toast.error(
                    res.error.message ??
                    "Failed to delete category."
                );
                return;
            }

            toast.success(
                "Category deleted successfully."
            );

            onOpenChange(false);

            router.refresh();
        });
    }

    return (
        <ConfirmDeleteModal
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={handleDelete}
            loading={isPending}
            title="Delete Category"
            description={`Are you sure you want to delete "${category.name}"? This action cannot be undone and may affect tutors, students, bookings, and subcategories associated with this category.`}
        />
    );
}