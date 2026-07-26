"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    CheckCircle2,
    XCircle,
    FolderTree,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { CategoryDetails } from "@/types/category.type";
import CategoryActionsDropdown from "./CategoryActionsDropdown";


type Props = {
    categories: CategoryDetails[];

    onViewDetails: (category: CategoryDetails) => void;
    onEdit: (category: CategoryDetails) => void;
    onDelete: (category: CategoryDetails) => void;
};

export default function CategoriesTable({
    categories,
    onViewDetails,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-center">Tutors</TableHead>
                        <TableHead className="text-center">Students</TableHead>
                        <TableHead className="text-center">Children</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>


                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="py-16 text-center text-muted-foreground"
                            >
                                No categories found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-xl border bg-muted">
                                            {category.thumbnail ? (
                                                <Image
                                                    src={category.thumbnail}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <FolderTree className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {category.name}
                                            </p>

                                            {category.shortDesc && (
                                                <p className="line-clamp-1 text-sm text-muted-foreground">
                                                    {category.shortDesc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            category.parentId
                                                ? "secondary"
                                                : "default"
                                        }
                                    >
                                        {category.parentId
                                            ? "Sub Category"
                                            : "Parent"}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {category._count.tutors}
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {category._count.students}
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {category._count.children}
                                </TableCell>

                                <TableCell>
                                    {category.isFeatured ? (
                                        <Badge className="gap-1">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Yes
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="gap-1"
                                        >
                                            <XCircle className="h-3.5 w-3.5" />
                                            No
                                        </Badge>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {format(
                                        new Date(category.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </TableCell>

                                <TableCell>
                                    <CategoryActionsDropdown
                                        onViewDetails={() =>
                                            onViewDetails(category)
                                        }
                                        onEdit={() =>
                                            onEdit(category)
                                        }
                                        onDelete={() =>
                                            onDelete(category)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}