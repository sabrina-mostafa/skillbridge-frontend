"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeHelp,
    MessageCircleQuestion,
    ShieldCheck,
    Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "../../../public/faq/heroImg.avif";


export default function FAQHero() {
    return (
        <section className="relative px-6 pt-14 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-14 py-18 lg:grid-cols-2 lg:py-24">
                {/* Left */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
                        <BadgeHelp className="h-4 w-4 text-primary" />
                        Frequently Asked Questions
                    </div>

                    <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                        Have
                        <span className="text-primary"> Questions?</span>

                        <br />

                        We&apos;ve Got Answers.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Find quick answers about tutors, bookings, payments,
                        online sessions, and everything you need to get started
                        with SkillBridge.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="rounded-full px-8"
                            asChild
                        >
                            <Link href="/contact">
                                Contact Support

                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8"
                            asChild
                        >
                            <Link href="/tutors">
                                Explore Tutors
                            </Link>
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="mt-12 flex flex-wrap gap-8">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <MessageCircleQuestion className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Instant Answers
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Common questions explained.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Trusted Platform
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Verified tutors & secure bookings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <Clock3 className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    24/7 Access
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Help whenever you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right */}

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl">
                        <Image
                            src={heroImage}
                            alt="SkillBridge FAQ"
                            width={700}
                            height={850}
                            priority
                            className="h-[620px] w-full object-cover"
                        />
                    </div>

                    {/* Floating Card 1 */}

                    <div className="absolute -left-6 top-8 hidden rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur lg:block">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3">
                                <BadgeHelp className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    100+ FAQs
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    Answered clearly
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 2 */}

                    <div className="absolute -bottom-6 right-6 hidden rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur lg:block">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-green-500/10 p-3">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    Secure Platform
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    Safe learning experience
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}