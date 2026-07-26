"use client";

import {
    LibraryBig,
    FolderTree,
    FolderOpen,
    GraduationCap,
} from "lucide-react";

import { SummaryCard } from "../../common/SummaryCard";

type Props = {
    totalCategories: number;
    parentCategories: number;
    subCategories: number;
    assignedTutors: number;
};

export default function CategorySummary({
    totalCategories,
    parentCategories,
    subCategories,
    assignedTutors,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Categories"
                value={totalCategories}
                description="Available subjects"
                icon={LibraryBig}
            />

            <SummaryCard
                title="Assigned Tutors"
                value={assignedTutors}
                description="Tutor-category assignments"
                icon={GraduationCap}
            />

            <SummaryCard
                title="Parent Categories"
                value={parentCategories}
                description="Top-level categories"
                icon={FolderTree}
            />

            <SummaryCard
                title="Sub Categories"
                value={subCategories}
                description="Nested categories"
                icon={FolderOpen}
            />
        </div>
    );
}