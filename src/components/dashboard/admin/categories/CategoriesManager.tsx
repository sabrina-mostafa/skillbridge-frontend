"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";

import { Analytics } from "@/types/analytics.type";
import { CategoryDetails } from "@/types/category.type";
import CategorySummary from "./CategorySummary";
import CategoriesTable from "./CategoriesTable";
import CategoryFilters from "./CategoryFilters";
import CategoryDetailsModal from "./CategoryDetailsModal";
import CreateCategoryDialog from "./CreateCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";



type Props = {
    categories: CategoryDetails[];
    parentCategories: CategoryDetails[];
    analytics: Analytics;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function CategoriesManager({
    categories,
    parentCategories,
    analytics,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryDetails | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [search, setSearch] = useState(
        searchParams.get("search") ?? ""
    );

    const [type, setType] = useState(() => {
        if (searchParams.get("parentOnly") === "true") return "PARENT";
        if (searchParams.get("childOnly") === "true") return "CHILD";
        return "ALL";
    });

    const [tutorFilter, setTutorFilter] = useState(() => {
        if (searchParams.get("hasTutors") === "true") return "HAS";
        if (searchParams.get("withNoTutor") === "true") return "NONE";
        return "ALL";
    });

    const [studentFilter, setStudentFilter] = useState(() => {
        if (searchParams.get("hasStudents") === "true") return "HAS";
        if (searchParams.get("withNoStudent") === "true") return "NONE";
        return "ALL";
    });

    const [sort, setSort] = useState(() => {
        const sortBy = searchParams.get("sortBy");
        const order = searchParams.get("sortOrder");

        if (sortBy === "createdAt" && order === "desc")
            return "newest";

        if (sortBy === "createdAt" && order === "asc")
            return "oldest";

        if (sortBy === "name" && order === "asc")
            return "az";

        if (sortBy === "name" && order === "desc")
            return "za";

        return "newest";
    });


    function updateQuery(
        updates: Record<string, string | undefined>
    ) {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value || value === "undefined") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        const current = searchParams.get("search") ?? "";

        if (current === debouncedSearch) return;

        updateQuery({
            search: debouncedSearch || undefined,
            page: "1",
        });
    }, [debouncedSearch]);


    return (
        <div className="space-y-6">
            <SectionHeader
                title="Category Management"
                description="Organize subjects, manage hierarchy, and control featured categories."
                action={
                    <Button
                        className="h-11 cursor-pointer px-4"
                        onClick={() => setCreateOpen(true)}
                    >
                        <Plus className="mr-1 h-5 w-5" />
                        <p className="font-bold">Create Category</p>
                    </Button>
                }
            />

            <CategorySummary
                totalCategories={analytics.categories.total}
                parentCategories={analytics.categories.parentCategories}
                subCategories={analytics.categories.childCategories}
                assignedTutors={analytics.categories.assignedTutors}
            />

            <CategoryFilters
                search={search}
                type={type}
                tutorFilter={tutorFilter}
                studentFilter={studentFilter}
                sort={sort}
                onSearchChange={setSearch}
                onTypeChange={(value) => {
                    setType(value);

                    switch (value) {
                        case "PARENT":
                            updateQuery({
                                parentOnly: "true",
                                childOnly: undefined,
                                page: "1",
                            });
                            break;

                        case "CHILD":
                            updateQuery({
                                childOnly: "true",
                                parentOnly: undefined,
                                page: "1",
                            });
                            break;

                        default:
                            updateQuery({
                                parentOnly: undefined,
                                childOnly: undefined,
                                page: "1",
                            });
                    }
                }}
                onTutorFilterChange={(value) => {
                    setTutorFilter(value);

                    switch (value) {
                        case "HAS":
                            updateQuery({
                                hasTutors: "true",
                                withNoTutor: undefined,
                                page: "1",
                            });
                            break;

                        case "NONE":
                            updateQuery({
                                withNoTutor: "true",
                                hasTutors: undefined,
                                page: "1",
                            });
                            break;

                        default:
                            updateQuery({
                                hasTutors: undefined,
                                withNoTutor: undefined,
                                page: "1",
                            });
                    }
                }}
                onStudentFilterChange={(value) => {
                    setStudentFilter(value);

                    switch (value) {
                        case "HAS":
                            updateQuery({
                                hasStudents: "true",
                                withNoStudent: undefined,
                                page: "1",
                            });
                            break;

                        case "NONE":
                            updateQuery({
                                withNoStudent: "true",
                                hasStudents: undefined,
                                page: "1",
                            });
                            break;

                        default:
                            updateQuery({
                                hasStudents: undefined,
                                withNoStudent: undefined,
                                page: "1",
                            });
                    }
                }}
                onSortChange={(value) => {
                    setSort(value);

                    switch (value) {
                        case "newest":
                            updateQuery({
                                sortBy: "createdAt",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;

                        case "oldest":
                            updateQuery({
                                sortBy: "createdAt",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;

                        case "az":
                            updateQuery({
                                sortBy: "name",
                                sortOrder: "asc",
                                page: "1",
                            });
                            break;

                        case "za":
                            updateQuery({
                                sortBy: "name",
                                sortOrder: "desc",
                                page: "1",
                            });
                            break;
                    }
                }}
                onReset={() => {
                    setSearch("");
                    setType("ALL");
                    setTutorFilter("ALL");
                    setStudentFilter("ALL");
                    setSort("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <CategoriesTable
                categories={categories}
                onViewDetails={(category) => {
                    setSelectedCategory(category);
                    setDetailsOpen(true);
                }}
                onEdit={(category) => {
                    setSelectedCategory(category);
                    setEditOpen(true);
                }}
                onDelete={(category) => {
                    setSelectedCategory(category);
                    setDeleteOpen(true);
                }}
            />

            <Pagination
                page={meta?.page ?? 1}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                limit={meta?.limit ?? 10}
                onPageChange={(page) =>
                    updateQuery({
                        page: String(page),
                    })
                }
                className="max-w-8xl sm:px-6"
            />

            <CategoryDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                category={selectedCategory}
            />

            <CreateCategoryDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                parentCategories={parentCategories}
            />

            <EditCategoryDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                category={selectedCategory}
                parentCategories={parentCategories}
            />

            <DeleteCategoryDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                category={selectedCategory}
            />
        </div>
    );
}