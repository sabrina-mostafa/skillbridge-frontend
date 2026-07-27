"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import Link from "next/link";
import { ArrowRight, Layers, BookOpen, Layers3, Route, Users } from "lucide-react";
import { AllCategoryProps, CategoryBase, ParentCategory } from "@/types/category.type";
import Pagination from "@/components/common/Pagination";
import CategoryFilterBar from "./CategoryFilterBar";
import heroImage from "../../../../../public/category/categoryHero.avif"
import Image from "next/image";


export default function AllCategoryClient({ allCategories }: { allCategories: AllCategoryProps }) {

    const { setQuery } = useQueryParams();

    return (
        <section className="min-h-screen bg-background">
            {/* HERO */}
            <div className="relative pt-14 border-b bg-background overflow-hidden">

                {/* GRID PATTERN (unchanged) */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 30px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* GRADIENT BLOBS (unchanged) */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-indigo-400/20 blur-[120px]" />
                    <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-violet-400/20 blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-[100px]" />
                </div>

                {/* SOFT GLOW */}
                <div className="absolute -top-32 right-0 w-125 h-125 bg-indigo-400/10 blur-[120px] rounded-full" />

                {/* CONTENT */}
                <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT SIDE */}
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold tracking-tight leading-tight">
                            Explore Categories
                        </h1>

                        <p className="text-muted-foreground mt-4 text-lg">
                            Discover academic courses and connect with expert tutors
                            across different learning domains.
                        </p>

                        <div className="mt-8 flex items-center gap-3 text-[14px] font-medium flex-wrap">
                            <span className="px-3 py-1 border bg-card rounded-full flex items-center gap-2">
                                <Layers3 className="h-4 w-4 text-primary" />
                                {allCategories?.meta.total} Categories
                            </span>

                            <span className="px-3 py-1 border bg-card rounded-full flex items-center gap-2">
                                <Route className="h-4 w-4 text-primary" />
                                Learning Paths Available
                            </span>

                            <span className="px-3 py-1 border bg-card rounded-full flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                Expert Tutors Network
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE VISUAL */}
                    <div className="relative w-full max-w-md mx-auto lg:mx-0">

                        {/* BACK LAYER (decor card) */}
                        <div className="absolute -bottom-8 -right-8 w-full h-64 rounded-2xl bg-gradient-to-br from-primary to-violet-500/10 border blur-[0px]" />

                        {/* MID LAYER (image container) */}
                        <div className="relative rounded-2xl border shadow-2xl overflow-hidden h-64 bg-card transform hover:scale-[1.01] transition-transform duration-300">

                            <Image
                                src={heroImage}
                                alt="Learning"
                                fill
                                className="object-cover scale-105"
                            />

                            {/* soft overlay gradient for premium look */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                        </div>

                        {/* FLOATING CARD - TOP RIGHT */}
                        <div className="absolute -top-4 -right-4 backdrop-blur-md bg-white/70 dark:bg-white/10 border rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">

                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-600 font-bold">
                                50+
                            </div>

                            <div className="text-xs">
                                <p className="font-semibold">Tutors</p>
                                <p className="text-muted-foreground">Expert instructors</p>
                            </div>
                        </div>

                        {/* FLOATING CARD - BOTTOM LEFT */}
                        <div className="absolute -bottom-5 -left-5 backdrop-blur-md bg-white/70 dark:bg-white/10 border rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">

                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                                12+
                            </div>

                            <div className="text-xs">
                                <p className="font-semibold">Categories</p>
                                <p className="text-muted-foreground">Learning paths</p>
                            </div>
                        </div>

                        {/* SOFT GLOW BEHIND EVERYTHING */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-400/20 blur-[80px] rounded-full" />
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-violet-400/20 blur-[80px] rounded-full" />
                        </div>

                    </div>

                </div>
            </div>

            {/* GRID */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="flex flex-col items-start justify-between mb-8">
                    {/* FILTER BAR */}
                    <CategoryFilterBar />

                    <div>
                        <h2 className="text-2xl font-bold">
                            Available Categories
                        </h2>

                        <p className="text-muted-foreground mt-1">
                            Choose a category to explore courses, tutors and learning opportunities.
                        </p>
                    </div>
                </div>

                <div className="mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allCategories?.data.map((parent: ParentCategory) => (
                        <Link
                            key={parent.id}
                            href={`/category/${parent.id}`}
                            className="
    group
    overflow-hidden
    rounded-2xl
    border
    bg-card
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
    hover:border-primary/40
"
                        >
                            {/* Thumbnail */}
                            {parent.thumbnail && <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={parent.thumbnail}
                                    alt={parent.name}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Category Badge */}
                                <div className="absolute left-4 top-4">
                                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow">
                                        Category
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-lg bg-white/20 p-2 backdrop-blur">
                                            <Layers className="h-5 w-5 text-white" />
                                        </div>

                                        <h2 className="text-xl font-bold text-white">
                                            {parent.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>}

                            {/* Content */}
                            <div className="p-6">
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {parent.shortDesc}
                                </p>

                                {/* Child Categories */}
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {parent.children.slice(0, 4).map((child: CategoryBase) => (
                                        <span
                                            key={child.id}
                                            className="
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-xs
            font-medium
            text-primary
            transition
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
                                        >
                                            {child.name}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-6 flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <BookOpen className="h-4 w-4" />
                                        <span>
                                            {parent.children.length} Courses
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                                        Explore
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* PAGINATION */}
                <Pagination
                    page={allCategories?.meta?.page || 1}
                    total={allCategories?.meta?.total || 0}
                    totalPages={allCategories?.meta?.totalPages || 1}
                    limit={9}
                    onPageChange={(p) => setQuery("page", String(p))}
                />

            </div>
        </section>
    )
}