"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BadgeCheck,
    BookOpen,
    CheckCircle,
    GraduationCap,
    Layers,
    Star,
    Users,
    ArrowRight,
} from "lucide-react";
import { CategoryBase, CategoryDetails } from "@/types/category.type";
import { TutorCategory } from "@/types/tutor.types";
import learning from "../../../../../public/category/learning.avif"
import { ScrollArea } from "@/components/ui/scroll-area";



export default function CourseDetailsClient({ course }: { course: CategoryDetails }) {

    const children = course.children || [];
    const tutors = course.tutors || [];
    const students = course.students || [];

    return (
        <div className="min-h-screen bg-background">
            {/* HERO */}
            <section className="relative pt-14 overflow-hidden border-b bg-background">

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

                {/* EXTRA GLOW */}
                <div className="absolute -top-32 right-0 w-125 h-125 bg-indigo-400/10 blur-[120px] rounded-full" />

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <div>
                            {course.isFeatured && (
                                <span className="inline-flex items-center gap-2 rounded-full border bg-yellow-100 text-yellow-700 px-4 py-1 text-sm font-medium mb-5">
                                    <BadgeCheck className="w-4 h-4" />
                                    Featured Course
                                </span>
                            )}

                            <div className="mb-3">
                                {course.parent && (
                                    <p className="text-sm font-bold text-primary">
                                        {course.parent.name}
                                    </p>
                                )}
                            </div>

                            <h1 className="text-5xl font-bold tracking-tight">
                                {course.name}
                            </h1>

                            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
                                {course.shortDesc ||
                                    "Master this subject with expert tutors and structured learning paths."}
                            </p>

                            {course.description && (
                                <p className="mt-4 text-muted-foreground">
                                    {course.description}
                                </p>
                            )}

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={`/tutors?course=${course.id}`}
                                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-6
                    py-3
                    text-white
                    font-medium
                    hover:bg-indigo-700
                    transition
                  "
                                >
                                    Explore Tutors
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <Link
                                    href="/tutors"
                                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-6
                    py-3
                    font-medium
                    hover:bg-muted
                    transition
                  "
                                >
                                    Browse All Tutors
                                </Link>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                                <Stat
                                    icon={<Layers className="w-5 h-5" />}
                                    label="Sub Courses"
                                    value={children.length}
                                />

                                <Stat
                                    icon={<GraduationCap className="w-6 h-6" />}
                                    label="Tutors"
                                    value={tutors.length}
                                />

                                <Stat
                                    icon={<Users className="w-5 h-5" />}
                                    label="Students"
                                    value={students.length}
                                />

                                <Stat
                                    icon={<BookOpen className="w-5 h-5" />}
                                    label="Outcomes"
                                    value={course.learningOutcomes?.length || 0}
                                />
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div>
                            <div className="relative h-95 rounded-3xl overflow-hidden border shadow-xl">
                                <Image
                                    fill
                                    alt={course.name}
                                    src={
                                        course.thumbnail || learning
                                    }
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEARNING OUTCOMES */}
            {course.learningOutcomes?.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold mb-8">
                        What You&apos;ll Learn
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {course.learningOutcomes.map(
                            (item: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border rounded-xl p-4"
                                >
                                    <CheckCircle className="w-5 h-5 text-primary" />

                                    <span>{item}</span>
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* TUTORS */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Available Tutors
                        </h2>

                        <p className="text-muted-foreground mt-1">
                            Learn from experienced tutors teaching this subject.
                        </p>
                    </div>
                </div>

                {tutors.length === 0 ? (
                    <div className="border rounded-2xl p-12 text-center">
                        <GraduationCap className="mx-auto w-12 h-12 text-muted-foreground" />

                        <h3 className="mt-4 text-xl font-semibold">
                            No Tutors Available
                        </h3>

                        <p className="text-muted-foreground mt-2">
                            Tutors will appear here once they join this subject.
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="max-h-150 pr-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tutors.map((item: TutorCategory) => (
                                <Link
                                    key={item.tutor.id}
                                    href={`/tutors/${item.tutor.id}`}
                                    className="
        group relative
        rounded-2xl
        border bg-card
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-primary
      "
                                >
                                    {/* TOP HEADER */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition">
                                                {item?.tutor?.user?.name}
                                            </h3>

                                            <p className="text-xs text-muted-foreground mt-1">
                                                {item.tutor?.experience}
                                            </p>
                                        </div>

                                        {/* Badge */}
                                        {item?.tutor?.isFeatured && (
                                            <span className="text-[11px] px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* BIO */}
                                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                        {item.tutor.bio}
                                    </p>

                                    {/* RATING ROW */}
                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-sm">
                                                {item.tutor.avgRating?.toFixed(1)}
                                            </span>

                                            <span className="text-xs text-muted-foreground ml-1">
                                                ({item.tutor.totalReviews || 0})
                                            </span>
                                        </div>

                                        {/* PRICE */}
                                        <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">
                                            ৳{item.tutor.hourlyRate}/hr
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="mt-5 pt-4 border-t flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            View profile
                                        </span>

                                        <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition">
                                            Open →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </section>

            {/* SUB COURSES */}
            {children.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold mb-8">
                        Sub Courses
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {children.map((child: CategoryBase) => (
                            <div
                                key={child.id}
                                className="border rounded-2xl p-6"
                            >
                                <h3 className="font-semibold">
                                    {child.name}
                                </h3>

                                <p className="text-sm text-muted-foreground mt-2">
                                    {child.shortDesc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function Stat({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
                {icon}
            </div>

            <p className="text-2xl font-bold">
                {value}
            </p>

            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    );
}

