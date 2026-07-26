"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    BookOpen,
    FolderTree,
    GraduationCap,
    Users,
    Calendar,
} from "lucide-react";

import FormModal from "@/components/common/FormModal";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { CategoryDetails } from "@/types/category.type";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: CategoryDetails | null;
};

export default function CategoryDetailsModal({
    open,
    onOpenChange,
    category,
}: Props) {
    if (!category) return null;

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Category Details"
            size="lg"
        >
            <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
                {/* Header */}
                <div className="flex items-start gap-5">
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl border bg-muted">
                        {category.thumbnail ? (
                            <Image
                                src={category.thumbnail}
                                alt={category.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <FolderTree className="h-10 w-10 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-semibold">
                            {category.name}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <Badge>
                                {category.parent
                                    ? "Sub Category"
                                    : "Parent Category"}
                            </Badge>

                            {category.isFeatured && (
                                <Badge variant="secondary">
                                    Featured
                                </Badge>
                            )}
                        </div>

                        {category.parent && (
                            <p className="text-sm text-muted-foreground">
                                Parent{" "}
                                <span className="font-medium text-foreground">
                                    {category.parent.name}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Tutors
                            </span>
                        </div>

                        <p className="mt-2 text-3xl font-bold">
                            {category._count.tutors}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Students
                            </span>
                        </div>

                        <p className="mt-2 text-3xl font-bold">
                            {category._count.students}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2">
                            <FolderTree className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Sub Categories
                            </span>
                        </div>

                        <p className="mt-2 text-3xl font-bold">
                            {category._count.children}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Short Description */}
                <div>
                    <h3 className="mb-2 font-semibold">
                        Short Description
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {category.shortDesc ||
                            "No short description available."}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <h3 className="mb-2 font-semibold">
                        Description
                    </h3>

                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {category.description ||
                            "No description available."}
                    </p>
                </div>

                {/* Learning Outcomes */}
                <div>
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                        <BookOpen className="h-4 w-4" />
                        Learning Outcomes
                    </h3>

                    {category.learningOutcomes.length > 0 ? (
                        <ul className="space-y-2">
                            {category.learningOutcomes.map((item, index) => (
                                <li
                                    key={index}
                                    className="rounded-lg border p-3 text-sm"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No learning outcomes available.
                        </p>
                    )}
                </div>

                {/* Child Categories */}
                {category.children.length > 0 && (
                    <div>
                        <h3 className="mb-3 font-semibold">
                            Child Categories
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {category.children.map((child) => (
                                <Badge
                                    key={child.id}
                                    variant="outline"
                                >
                                    {child.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <Separator />

                {/* Dates */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm font-medium">
                                Created
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {format(
                                    new Date(category.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm font-medium">
                                Last Updated
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {format(
                                    new Date(category.updatedAt),
                                    "dd MMM yyyy"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FormModal>
    );
}