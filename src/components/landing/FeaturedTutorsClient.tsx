"use client";

import Image from "next/image";
import { Star, Users, BarChart, Clock, ArrowRight, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Tutor } from "@/types/tutor.types";
import Link from "next/link";
import { CategoryBase } from "@/types/category.type";



type FeaturedTutorsClientProps = {
    tutors: Tutor[];
    allTutorsCount: number;
};


export default function FeaturedTutorsClient({ tutors, allTutorsCount }: FeaturedTutorsClientProps) {
    const featuredTutors = tutors;

    return (
        <section className="md:py-24 py-18 px-6 bg-card">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-14">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        {/* LEFT SIDE */}
                        <div className="max-w-full md:max-w-2xl xl:max-w-235">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                            >

                                <BadgeCheck className="h-4 w-4" />
                                Featured Tutors
                            </motion.div>

                            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                                Learn from
                                <span className="block text-primary">
                                    Expert Tutors
                                </span>
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-muted-foreground">
                                Discover experienced educators carefully selected for their
                                teaching expertise, subject knowledge, and consistent student
                                success. Learn with confidence through personalized one-on-one
                                sessions designed to help you achieve your academic goals.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <BadgeCheck className="h-4 w-4 text-primary" />
                                    Verified professionals
                                </div>

                                <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />

                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    Highly rated by students
                                </div>

                                <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />

                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-primary" />
                                    Personalized learning
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="lg:text-right">
                            <div className="mb-5">
                                <p className="text-4xl font-bold text-primary">
                                    {allTutorsCount ?? 0}+
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Qualified tutors across multiple subjects
                                </p>
                            </div>

                            <Link
                                href="/tutors"
                                className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
                            >
                                Explore All Tutors
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>


                {/* Horizontal Cards Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {featuredTutors.map((tutor, i) => (
                        <motion.div
                            key={tutor.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="group overflow-hidden rounded-2xl border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                        >

                            <div className="flex flex-col sm:flex-row">
                                {/* Image */}
                                <div className="relative border-r border-primary/40 h-56 sm:h-auto sm:w-64 md:w-84 xl:w-70 overflow-hidden">
                                    <Image
                                        src={tutor.user.image || "/default-avatar.png"}
                                        alt={tutor.user.name}
                                        fill
                                        className="object-cover object-top transition duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    {tutor.isFeatured && (
                                        <div className="absolute left-4 top-4">
                                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                                                ★ Featured
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 backdrop-blur">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold dark:text-black">
                                            {Number(tutor.avgRating ?? 0).toFixed(1)}
                                        </span>
                                        <span className="text-xs text-muted-foreground dark:text-gray-600">
                                            ({tutor.totalReviews})
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    {/* Categories */}
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {tutor.categories.slice(0, 2).map((category: CategoryBase) => (
                                            <span
                                                key={category.id}
                                                className="rounded-full bg-primary/10 px-3 py-1 text-[9px] font-semibold text-primary"
                                            >
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                                        {tutor.user.name}
                                    </h3>

                                    {/* Education */}
                                    <p className="text-[12px] text-muted-foreground line-clamp-1">
                                        {tutor.education}
                                    </p>

                                    {/* Bio */}
                                    <p className="line-clamp-2 text-[12px] leading-6 text-muted-foreground">
                                        {tutor.bio}
                                    </p>

                                    {/* Stats */}
                                    <div className="my-4 flex items-center justify-between rounded-xl border bg-muted/40 px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-primary" />

                                            <div>
                                                <p className="text-xs font-semibold">
                                                    {tutor._count.bookingsAsTutor}
                                                </p>

                                                <p className="text-[11px] text-muted-foreground">
                                                    Sessions
                                                </p>
                                            </div>
                                        </div>

                                        <div className="h-8 w-px bg-border" />

                                        <div className="flex items-center gap-2">
                                            <BarChart className="h-4 w-4 text-primary" />

                                            <div>
                                                <p className="text-xs font-semibold">
                                                    {tutor.experience}
                                                </p>

                                                <p className="text-[11px] text-muted-foreground">
                                                    Experience
                                                </p>
                                            </div>
                                        </div>

                                        <div className="h-8 w-px bg-border" />

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-primary" />

                                            <div>
                                                <p className="text-xs font-semibold">
                                                    {tutor._count.availability}
                                                </p>

                                                <p className="text-[11px] text-muted-foreground">
                                                    Slots
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between border-t pt-4">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                                Starting from
                                            </p>

                                            <div className="flex items-end gap-1">
                                                <span className="text-xl font-bold text-primary">
                                                    ৳{Number(tutor.hourlyRate).toLocaleString()}
                                                </span>

                                                <span className="pb-1 text-xs text-muted-foreground">
                                                    /hour
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/tutors/${tutor.id}`}
                                            className="inline-flex items-center gap-2
                                rounded-xl bg-primary px-3 py-2 text-xs font-semibold
                                text-primary-foreground transition-all duration-300
                                hover:scale-105 hover:shadow-lg"
                                        >
                                            View Profile
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

