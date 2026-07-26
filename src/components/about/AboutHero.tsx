"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    GraduationCap,
    Users,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "../../../public/about/hero.avif"


export default function AboutHero() {
    return (
        <section className="relative px-6 pt-14 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background Blur */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
                {/* LEFT */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5 }}
                        className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 shadow-sm"
                    >
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                            About SkillBridge
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .15 }}
                        className="mt-8 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl"
                    >
                        Connecting Students with
                        <span className="block text-primary">
                            Expert Tutors
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .3 }}
                        className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground"
                    >
                        SkillBridge helps students discover trusted tutors,
                        schedule one-to-one learning sessions, and achieve their
                        academic and professional goals through personalized
                        education.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .45 }}
                        className="mt-8 grid gap-4"
                    >
                        {[
                            "Verified and experienced tutors",
                            "Flexible online & offline sessions",
                            "Secure booking experience",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-full bg-primary/10 p-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                </div>

                                <span className="text-muted-foreground">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .6 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <Button
                            size="lg"
                            className="rounded-full px-8"
                            asChild
                        >
                            <Link href="/tutors">
                                Find Tutors
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8"
                            asChild
                        >
                            <Link href="/category">
                                Explore Courses
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .6 }}
                    className="relative"
                >
                    <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-2xl">
                        <Image
                            src={heroImage}
                            alt="Students learning with tutors"
                            width={700}
                            height={850}
                            className="h-[650px] w-full object-cover"
                            priority
                        />
                    </div>

                    {/* Floating Card 1 */}
                    <div className="absolute -left-10 top-2 rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <Users className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-xl md:text-3xl font-bold">
                                    500+
                                </p>

                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Verified Tutors
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="absolute -right-8 bottom-20 rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-xl md:text-3xl font-bold">
                                    2K+
                                </p>

                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Active Students
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 3 */}
                    <div className="absolute left-20 -bottom-8 rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-xl md:text-3xl font-bold">
                                    50+
                                </p>

                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Categories
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}