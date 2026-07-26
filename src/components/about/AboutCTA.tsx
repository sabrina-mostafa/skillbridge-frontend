"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    GraduationCap,
    Users,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import img from "../../../public/about/aboutCTA.avif"


export default function AboutCTA() {
    return (
        <section className="relative overflow-hidden bg-card py-24 px-6">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl"
                >
                    {/* Background Image */}
                    <Image
                        src={img}
                        alt="Students learning with tutors"
                        fill
                        className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-slate-950/70" />

                    {/* Decorative Blur */}
                    <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

                    <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 px-8 py-20 md:px-16 lg:px-20">
                        <div className="mx-auto max-w-4xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Join the SkillBridge Community
                            </span>

                            <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                                Ready to Transform
                                <span className="block text-primary">
                                    Your Learning Journey?
                                </span>
                            </h2>

                            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white">
                                Whether you&apos;re searching for the perfect tutor
                                or looking to share your expertise with students,
                                SkillBridge provides everything you need for a
                                seamless, personalized learning experience.
                            </p>

                            {/* Feature Pills */}
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
                                    <div className="flex items-center gap-2 text-white">
                                        <Users className="h-4 w-4 text-primary" />
                                        Verified Tutors
                                    </div>
                                </div>

                                <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
                                    <div className="flex items-center gap-2 text-white">
                                        <GraduationCap className="h-4 w-4 text-primary" />
                                        Personalized Learning
                                    </div>
                                </div>

                                <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
                                    <div className="flex items-center gap-2 text-white">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        Flexible Scheduling
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="h-13 rounded-full px-8 text-base"
                                    asChild
                                >
                                    <Link href="/tutors">
                                        Find a Tutor
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="h-13 rounded-full px-8 text-base"
                                    asChild
                                >
                                    <Link href="/category">
                                        Explore Courses
                                    </Link>
                                </Button>
                            </div>

                            {/* Bottom Stats */}
                            <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
                                <div>
                                    <h3 className="text-4xl font-bold text-white">
                                        500+
                                    </h3>

                                    <p className="mt-2 text-slate-300">
                                        Verified Tutors
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-4xl font-bold text-white">
                                        2,000+
                                    </h3>

                                    <p className="mt-2 text-slate-300">
                                        Active Students
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-4xl font-bold text-white">
                                        50+
                                    </h3>

                                    <p className="mt-2 text-slate-300">
                                        Learning Categories
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}