"use client"

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { CategoryDetailsResponse, ChildCategory } from "@/types/category.type";
import Pagination from "@/components/common/Pagination";
import { useQueryParams } from "@/hooks/useQueryParams";
import CourseFilterBar from "./CourseFilterBar";
import subCategoryImage from "../../../../../../public/category/subCategoryImg.jpg"
import Image from "next/image";


export default function CategoryCoursesClient({ categoryResponse }: { categoryResponse: CategoryDetailsResponse }) {
    const course = categoryResponse?.data;
    const metaData = categoryResponse?.meta;
    const { setQuery } = useQueryParams();

    if (!course) {
        notFound();
    }
    const children = course?.children || [];

    const totalCourses = children.length;

    const totalTutors = children.reduce(
        (total: number, child: ChildCategory) =>
            total + (child.tutors?.length || 0),
        0
    );
    const totalStudents = children.reduce(
        (total: number, child: ChildCategory) =>
            total + (child.students?.length || 0),
        0
    );
    const maxValue = Math.max(
        totalCourses,
        totalTutors,
        totalStudents,
        1
    );

    const stats = [
        {
            label: "Available Courses",
            value: totalCourses,
            color: "from-indigo-500 to-indigo-400",
            textColor: "text-indigo-600",
        },
        {
            label: "Active Tutors",
            value: totalTutors,
            color: "from-emerald-500 to-emerald-400",
            textColor: "text-emerald-600",
        },
        {
            label: "Enrolled Students",
            value: totalStudents,
            color: "from-violet-500 to-fuchsia-400",
            textColor: "text-violet-600",
        },
    ];



    return (
        <section className="min-h-screen bg-background">
            {/* Hero */}
            <div className="relative pt-14 border-b bg-background overflow-hidden">

                {/* GRID PATTERN */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 30px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* GRADIENT BLOBS */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-indigo-400/20 blur-[120px]" />
                    <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-violet-400/20 blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-[100px]" />
                </div>

                <div className="absolute -top-32 right-0 w-125 h-125 bg-indigo-400/10 blur-[120px] rounded-full" />

                {/* CONTENT */}
                <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT SIDE */}
                    <div className="max-w-2xl">
                        <p className="text-sm text-muted-foreground mb-3">
                            Course Category
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {course.name}
                        </h1>

                        <p className="mt-4 text-lg text-muted-foreground">
                            Explore available courses, connect with expert tutors,
                            and find the right learning path for your academic goals.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="px-4 py-2 rounded-full border bg-card text-sm">
                                🎓 Learning Paths Available
                            </span>
                            <span className="px-4 py-2 rounded-full border bg-card text-sm">
                                👨‍🏫 Expert Tutors
                            </span>
                            <span className="px-4 py-2 rounded-full border bg-card text-sm">
                                📚 {children.length} Courses
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE - VISUAL + STATS DASHBOARD */}
                    <div className="relative w-full max-w-md space-y-5">

                        {/* BACKGROUND GLOW */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full" />
                        </div>

                        {/* HERO IMAGE CARD (premium look) */}
                        <div className="relative rounded-2xl overflow-hidden border shadow-xl h-44 group">
                            <Image
                                src={subCategoryImage}
                                alt="Learning"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 448px"
                            />

                            {/* DARK OVERLAY FOR DEPTH */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                            {/* FLOATING LABEL */}
                            <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-xs px-3 py-1 rounded-full border">
                                🎓 Learning Ecosystem
                            </div>
                        </div>

                        {/* STATS GRID (converted into glass cards) */}
                        <div className="grid grid-cols-3 gap-4 relative z-10">
                            {stats.map((stat) => {
                                const percentage = Math.max(
                                    15,
                                    (stat.value / maxValue) * 100
                                );

                                return (
                                    <div
                                        key={stat.label}
                                        className="
                    rounded-lg
                    border
                    bg-white/70
                    dark:bg-card/60
                    backdrop-blur-md
                    p-3
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                "
                                    >
                                        {/* Label */}
                                        <p className="text-xs text-muted-foreground">
                                            {stat.label}
                                        </p>

                                        {/* Number + Background Fill */}
                                        <div className="relative mt-2 h-5 flex items-center">

                                            {/* Accent Fill Behind Number */}
                                            <div
                                                className={`
                            absolute
                            left-0
                            h-5
                            rounded-tr-md
                            bg-gradient-to-r
                            ${stat.color}
                            opacity-18
                            transition-all
                            duration-1000
                        `}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />

                                            {/* Glow Layer */}
                                            <div
                                                className={`
                            absolute
                            left-0
                            h-6
                            rounded-lg
                            bg-gradient-to-r
                            ${stat.color}
                            opacity-26
                            blur-md
                            transition-all
                            duration-1000
                        `}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />

                                            {/* Value */}
                                            <p
                                                className={`
                            relative
                            text-xl
                            font-bold
                            ${stat.textColor}
                        `}
                                            >
                                                {stat.value.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Percentage Indicator */}
                                        <div className="mt-1 flex items-center justify-between">
                                            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className={`
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                ${stat.color}
                            `}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>

                                            <span
                                                className={`
                            ml-2
                            text-[10px]
                            font-medium
                            ${stat.textColor}
                        `}
                                            >
                                                {Math.round(percentage)}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* INSIGHT CARD (now feels like SaaS metric card) */}
                        <div className="relative rounded-xl border bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-card dark:to-card/60 p-4 flex items-center justify-between shadow-sm overflow-hidden">

                            {/* decorative blur */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/20 blur-2xl rounded-full" />

                            <div className="relative">
                                <p className="text-sm font-semibold">Category Growth</p>
                                <p className="text-xs text-muted-foreground">
                                    Active learning ecosystem
                                </p>
                            </div>

                            <div className="relative text-green-600 font-bold text-sm">
                                +12.4%
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Children */}
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="flex flex-col items-start justify-between mb-8">

                    {/* FILTER BAR */}
                    <CourseFilterBar />

                    <div>
                        <h2 className="text-2xl font-bold">
                            Available Courses
                        </h2>

                        <p className="text-muted-foreground mt-1">
                            Choose a course to explore tutors and learning opportunities.
                        </p>
                    </div>
                </div>

                {children.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {children.map((child: ChildCategory) => (
                            <Link
                                key={child.id}
                                href={`/course/${child.id}`}
                                className="
      group
      rounded-2xl
      border
      bg-card
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:border-indigo-300
    "
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-xl border bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    {child.name}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Learn {child.name} with qualified tutors and personalized guidance.
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-indigo-50 border text-primary dark:bg-indigo-950/30 px-3 py-1 text-xs font-medium">
                                        {(child.tutors?.length || 0)} Tutors
                                    </span>

                                    <span className="rounded-full border bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 px-3 py-1 text-xs font-medium">
                                        {(child.students?.length || 0)} Students
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Layers className="h-4 w-4" />

                                        Course
                                    </div>

                                    {child.tutors?.length > 0 ? (
                                        <span className="text-xs font-medium text-emerald-600">
                                            Tutors Available
                                        </span>
                                    ) : (
                                        <span className="text-xs font-medium text-amber-600">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-card p-12 text-center">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />

                        <h3 className="mt-4 text-xl font-semibold">
                            No Courses Found
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            There are currently no child Courses under this category.
                        </p>
                    </div>
                )}

                {/* PAGINATION */}
                <Pagination
                    page={metaData?.page || 1}
                    total={metaData?.total || 0}
                    totalPages={metaData?.totalPages || 1}
                    limit={9}
                    onPageChange={(p) => setQuery("page", String(p))}
                />
            </div>
        </section>
    )
}