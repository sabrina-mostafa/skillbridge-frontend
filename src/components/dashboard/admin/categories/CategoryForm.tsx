"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupTextarea, } from "@/components/ui/input-group";
import { CategoryDetails } from "@/types/category.type";
import { categorySchema, CategorySchemaValues, } from "@/schemas/category.schema";
import { Plus, X } from "lucide-react";


type Props = {
    mode: "create" | "edit";
    loading?: boolean;
    category?: CategoryDetails | null;
    parentCategories: CategoryDetails[];
    onSubmit: (values: CategorySchemaValues) => void;
};

export default function CategoryForm({
    mode,
    loading,
    category,
    parentCategories,
    onSubmit,
}: Props) {
    const [outcome, setOutcome] = useState("");
    console.log("parentCategories:", parentCategories);

    const form = useForm({
        defaultValues: {
            name: category?.name ?? "",
            shortDesc: category?.shortDesc ?? "",
            description: category?.description ?? "",
            thumbnail: category?.thumbnail ?? "",
            parentId: category?.parentId ?? null,
            learningOutcomes: category?.learningOutcomes ?? [],
            isFeatured: category?.isFeatured ?? true,
        },

        validators: {
            onSubmit: categorySchema,
        },

        onSubmit: ({ value }) => {
            onSubmit({
                ...value,
                name: value.name.trim(),
                shortDesc: value.shortDesc.trim(),
                description: value.description.trim(),
                thumbnail: value.thumbnail.trim(),
                learningOutcomes: (value.learningOutcomes || [])
                    .map(item => item.trim())
                    .filter(Boolean),
            });
        }
    });

    // Fix 1: Ensure form state resets if the async category loads later
    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name ?? "",
                shortDesc: category.shortDesc ?? "",
                description: category.description ?? "",
                thumbnail: category.thumbnail ?? "",
                parentId: category.parentId ?? null,
                learningOutcomes: category.learningOutcomes ?? [],
                isFeatured: category.isFeatured ?? true,
            });
        }
    }, [category, form]);

    return (
        <form
            id="category-form"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                {/* Name */}
                <form.Field name="name">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel>Name</FieldLabel>

                                <Input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    aria-invalid={isInvalid}
                                />

                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Parent Category */}
                <form.Field name="parentId">
                    {(field) => (
                        <Field>
                            <FieldLabel>Parent Category</FieldLabel>

                            <Select
                                value={field.state.value ?? "none"}
                                onValueChange={(value) =>
                                    field.handleChange(
                                        value === "none" ? null : value
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="none">
                                        None
                                    </SelectItem>

                                    {(parentCategories ?? []).map((parent) => (
                                        <SelectItem
                                            key={parent.id}
                                            value={parent.id}
                                        >
                                            {parent.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                </form.Field>

                {/* Short Description */}
                <form.Field name="shortDesc">
                    {(field) => (
                        <Field>
                            <FieldLabel>Short Description</FieldLabel>

                            <Input
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                        </Field>
                    )}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                    {(field) => (
                        <Field>
                            <FieldLabel>Description</FieldLabel>

                            <InputGroup>
                                <InputGroupTextarea
                                    className="min-h-28"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Field>
                    )}
                </form.Field>

                {/* Thumbnail */}
                <form.Field name="thumbnail">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel>Thumbnail URL</FieldLabel>

                                <Input
                                    placeholder="https://example.com/image.png"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    aria-invalid={isInvalid}
                                />

                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Learning Outcomes */}
                <form.Field name="learningOutcomes">
                    {(field) => {
                        // Fallback to empty array if state or value is missing
                        const currentValue = field.state.value || [];

                        return (
                            <Field>
                                <FieldLabel>Learning Outcomes</FieldLabel>

                                <div className="flex gap-2">
                                    <Input
                                        value={outcome}
                                        placeholder="Enter learning outcome"
                                        onChange={(e) => setOutcome(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                                const trimmed = outcome.trim();
                                                if (!trimmed) return;

                                                // Safe check using fallback array
                                                if (currentValue.includes(trimmed)) return;

                                                field.handleChange([
                                                    ...currentValue,
                                                    trimmed,
                                                ]);

                                                setOutcome("");
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        className="h-8 rounded-[12px] cursor-pointer"
                                        onClick={() => {
                                            const trimmed = outcome.trim();
                                            if (!trimmed) return;

                                            // Safe check using fallback array
                                            if (currentValue.includes(trimmed)) return;

                                            field.handleChange([
                                                ...currentValue,
                                                trimmed,
                                            ]);
                                            setOutcome("");
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add
                                    </Button>
                                </div>

                                <div className="mt-3 space-y-2">
                                    {/* Safe mapping using fallback array */}
                                    {currentValue.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-md border p-2"
                                        >
                                            <span>{item}</span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                type="button"
                                                onClick={() =>
                                                    // Safe filter operation
                                                    field.handleChange(
                                                        currentValue.filter((_, i) => i !== index)
                                                    )
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Featured */}
                <form.Field name="isFeatured">
                    {(field) => (
                        <Field>
                            <FieldLabel>Featured</FieldLabel>

                            <Select
                                value={String(field.state.value)}
                                onValueChange={(value) =>
                                    field.handleChange(value === "true")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="true">
                                        Featured
                                    </SelectItem>

                                    <SelectItem value="false">
                                        Not Featured
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                </form.Field>

                <Button
                    type="submit"
                    form="category-form"
                    disabled={loading}
                    className="w-full mt-3 h-10 cursor-pointer"
                >
                    {loading
                        ? "Saving..."
                        : mode === "create"
                            ? "Create Category"
                            : "Save Changes"}
                </Button>
            </FieldGroup>
        </form>
    );
}