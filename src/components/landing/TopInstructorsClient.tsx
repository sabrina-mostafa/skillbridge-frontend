"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    Star,
} from "lucide-react";

import { Tutor } from "@/types/tutor.types";

type Props = {
    tutors: Tutor[];
};

export default function TopInstructorsClient({
    tutors,
}: Props) {
    return (
        <div>
            {tutors.length > 0 && <section className="bg-background px-6 py-18 md:py-24">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            <BadgeCheck className="h-4 w-4" />
                            Top Tutors
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Meet Our Highest Rated Tutors
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Learn from experienced professionals trusted by hundreds
                            of students across different subjects.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {tutors.map((tutor, index) => (
                            <motion.div
                                key={tutor.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.45 }}
                                className="group overflow-hidden rounded-3xl border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                            >

                                {/* Image */}
                                <div className="relative h-60 overflow-hidden">
                                    <Image
                                        src={
                                            tutor.user.image ??
                                            "/default-avatar.png"
                                        }
                                        alt={tutor.user.name}
                                        fill
                                        className="object-cover object-top rounded-t-3xl transition duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                    {tutor.isFeatured && (
                                        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                            Featured
                                        </span>
                                    )}

                                    <div className="absolute top-4 right-4 rounded-full border border-primary/40 bg-white/90 px-3 py-1 backdrop-blur">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                                            <span className="text-xs font-bold text-black">
                                                {Number(
                                                    tutor.avgRating ?? 0
                                                ).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">
                                                {tutor.user.name}
                                            </h3>

                                            <p className="text-xs text-white/80">
                                                {tutor.education}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 p-6">
                                    <div className="flex flex-wrap gap-2">
                                        {tutor.categories
                                            .slice(0, 2)
                                            .map((category) => (
                                                <span
                                                    key={category.id}
                                                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                    </div>

                                    <div className="flex items-center justify-between border-t pt-4">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                                Starting From
                                            </p>

                                            <p className="text-xl font-bold text-primary">
                                                ৳
                                                {Number(
                                                    tutor.hourlyRate
                                                ).toLocaleString()}
                                                <span className="ml-1 text-[12px] font-medium text-muted-foreground">
                                                    /hr
                                                </span>
                                            </p>
                                        </div>

                                        <Link
                                            href={`/tutors/${tutor.id}`}
                                            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:scale-105"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center">
                        <p className="mb-3 text-muted-foreground">
                            Find the right tutor and begin your learning journey today.
                        </p>

                        <Link
                            href="/tutors"
                            className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                        >
                            Start Learning

                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>}
        </div>
    );
}