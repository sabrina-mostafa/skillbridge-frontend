"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    LifeBuoy,
    Mail,
    MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FAQCTA() {
    return (
        <section className="relative overflow-hidden px-6 bg-card py-20 md:py-28">
            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden rounded-[2rem] border bg-card shadow-xl"
                >
                    <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_0.9fr]">
                        {/* Left */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                <LifeBuoy className="h-4 w-4" />
                                Need More Help?
                            </div>

                            <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                                Didn&apos;t Find Your
                                <span className="block text-primary">
                                    Answer Here?
                                </span>
                            </h2>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Our support team is always happy to help.
                                Whether you have questions about tutors,
                                bookings, payments, or your account, we&apos;re only
                                a message away.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8"
                                    asChild
                                >
                                    <Link href="/#contact">
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
                                        Browse Tutors
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="grid gap-5">
                            <div className="rounded-2xl border bg-background p-6 transition-all hover:border-primary hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Email Support
                                        </p>

                                        <h3 className="font-semibold">
                                            support@skillbridge.com
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-background p-6 transition-all hover:border-primary hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <MessageCircle className="h-6 w-6 text-primary" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Average Response Time
                                        </p>

                                        <h3 className="font-semibold">
                                            Within 24 Hours
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-primary p-6 text-primary-foreground shadow-lg">
                                <h3 className="text-lg font-bold">
                                    Still have questions?
                                </h3>

                                <p className="mt-2 text-sm text-primary-foreground/90">
                                    Our team is committed to making your
                                    learning experience smooth and successful.
                                    Don&apos;t hesitate to reach out.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}