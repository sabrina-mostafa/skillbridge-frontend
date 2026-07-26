"use client";

import { motion } from "framer-motion";
import {
    GraduationCap,
    Users,
    CalendarCheck,
} from "lucide-react";

export default function AboutStory() {
    return (
        <section className="py-20 md:py-28 bg-card">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                            Our Story
                        </span>

                        <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                            Building Better
                            <span className="block text-primary">
                                Learning Connections
                            </span>
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Finding the right tutor shouldn&apos;t be complicated.
                            SkillBridge was created to connect passionate
                            students with experienced tutors through a modern,
                            transparent, and personalized learning platform.
                        </p>

                        <p className="mt-6 leading-8 text-muted-foreground">
                            Whether you&apos;re preparing for exams, improving your
                            professional skills, or exploring a new subject,
                            SkillBridge makes one-on-one learning simple.
                            Students can discover verified tutors, compare
                            expertise, schedule sessions, and learn confidently
                            from anywhere.
                        </p>

                        <p className="mt-6 leading-8 text-muted-foreground">
                            For tutors, SkillBridge provides an opportunity to
                            showcase expertise, manage bookings efficiently,
                            grow a personal teaching brand, and focus on what
                            matters most—helping students succeed.
                        </p>
                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid gap-6">
                            <div className="rounded-3xl border bg-card p-8 shadow-sm">
                                <GraduationCap className="h-10 w-10 text-primary" />

                                <h3 className="mt-5 text-xl font-semibold">
                                    Personalized Learning
                                </h3>

                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Every student learns differently. We help
                                    learners find tutors that match their
                                    individual goals, pace, and preferred
                                    learning style.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-3xl border bg-card p-6 shadow-sm">
                                    <Users className="h-8 w-8 text-primary" />

                                    <h4 className="mt-4 font-semibold">
                                        Verified Tutors
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Learn from trusted educators with real
                                        expertise.
                                    </p>
                                </div>

                                <div className="rounded-3xl border bg-card p-6 shadow-sm">
                                    <CalendarCheck className="h-8 w-8 text-primary" />

                                    <h4 className="mt-4 font-semibold">
                                        Flexible Scheduling
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Book tutoring sessions that fit your own
                                        schedule and availability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}