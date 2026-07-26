"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

type PaginationProps = {
    page: number;
    total: number;
    limit?: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
};

export default function Pagination({
    page,
    total,
    limit = 9,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const pages = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    return (
        <div className={cn("w-full mt-8 max-w-7xl mx-auto", className)}>
            {/* RESULTS HEADER */}
            <div className="mb-6 flex items-center justify-between text-primary">
                <p className="text-sm">
                    Showing{" "}
                    <span className="font-semibold text-foreground">{start}</span> -{" "}
                    <span className="font-semibold text-foreground">{end}</span> of{" "}
                    <span className="font-semibold text-foreground">{total}</span>
                </p>

                <div className="text-sm">
                    Page {page} of {totalPages}
                </div>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-2 pb-20">
                {/* PREV */}
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${page <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
                        }`}
                >
                    ← Prev
                </button>

                {/* PAGE NUMBERS */}
                <div className="flex items-center gap-2">
                    {pages.map((p) => {
                        if (
                            p !== 1 &&
                            p !== totalPages &&
                            Math.abs(p - page) > 1
                        ) {
                            if (p === 2 || p === totalPages - 1) {
                                return (
                                    <span key={p} className="px-2 text-muted-foreground">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        }

                        return (
                            <button
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={`min-w-10 px-3 py-2 rounded-lg text-sm font-semibold border transition ${p === page
                                        ? "bg-primary text-white shadow-md"
                                        : "hover:bg-muted cursor-pointer"
                                    }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>

                {/* NEXT */}
                <button
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${page >= totalPages
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-muted cursor-pointer"
                        }`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}