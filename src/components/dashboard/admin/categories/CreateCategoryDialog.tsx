"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import FormModal from "@/components/common/FormModal";
import { CategoryDetails } from "@/types/category.type";
import { categoryClientService } from "@/services/category/category.client.service";
import { CategorySchemaValues } from "@/schemas/category.schema";
import CategoryForm from "./CategoryForm";


type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    parentCategories: CategoryDetails[];
};

export default function CreateCategoryDialog({
    open,
    onOpenChange,
    parentCategories,
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    function handleSubmit(values: CategorySchemaValues) {
        startTransition(async () => {
            const payload = {
                ...values,
                shortDesc: values.shortDesc || undefined,
                description: values.description || undefined,
                thumbnail: values.thumbnail || undefined,
            };

            const res = await categoryClientService.create(payload);

            if (res.error) {
                toast.error(res.error.message ?? "Failed to create category.");
                return;
            }

            toast.success("Category created successfully.");
            onOpenChange(false);
            router.refresh();
        });
    }

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Create Category"
            className="max-h-[80vh]"
            size="lg"
        >
            <CategoryForm
                mode="create"
                loading={isPending}
                category={null}
                parentCategories={parentCategories ?? []}
                onSubmit={handleSubmit}
            />
        </FormModal>
    );
}