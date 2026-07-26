"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormModal from "@/components/common/FormModal";
import { CategoryDetails } from "@/types/category.type";
import { CategorySchemaValues } from "@/schemas/category.schema";
import { categoryClientService } from "@/services/category/category.client.service";
import CategoryForm from "./CategoryForm";


type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    category: CategoryDetails | null;

    parentCategories: CategoryDetails[];
};

export default function EditCategoryDialog({
    open,
    onOpenChange,
    category,
    parentCategories,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    if (!category) return null;

    function handleSubmit(values: CategorySchemaValues) {
        if (!category) return;

        startTransition(async () => {
            const res = await categoryClientService.update(
                category.id,
                values
            );

            if (res.error) {
                toast.error(
                    res.error.message ??
                    "Failed to update category."
                );
                return;
            }
            toast.success("Category updated successfully.");

            onOpenChange(false);

            router.refresh();
        });
    }

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            className="max-h-[80vh]"
            title="Edit Category"
            size="lg"
        >
            <CategoryForm
                mode="edit"
                category={category}
                loading={isPending}
                parentCategories={parentCategories ?? []}
                onSubmit={handleSubmit}
            />
        </FormModal>
    );
}