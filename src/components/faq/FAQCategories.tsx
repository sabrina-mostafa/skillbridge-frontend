"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    CalendarCheck2,
    CreditCard,
    GraduationCap,
    ShieldCheck,
    Users,
    ArrowDown,
} from "lucide-react";

const categories = [
    {
        id: "general",
        title: "General",
        description: "Platform overview and getting started.",
        questions: 6,
        icon: BookOpen,
    },
    {
        id: "students",
        title: "Students",
        description: "Booking tutors and learning sessions.",
        questions: 8,
        icon: GraduationCap,
    },
    {
        id: "tutors",
        title: "Tutors",
        description: "Teaching, profiles and availability.",
        questions: 7,
        icon: Users,
    },
    {
        id: "bookings",
        title: "Bookings",
        description: "Scheduling, cancellations and meetings.",
        questions: 5,
        icon: CalendarCheck2,
    },
    {
        id: "payments",
        title: "Payments",
        description: "Pricing, billing and future payment support.",
        questions: 4,
        icon: CreditCard,
    },
    {
        id: "account",
        title: "Account",
        description: "Security, verification and profile settings.",
        questions: 6,
        icon: ShieldCheck,
    },
];

export default function FAQCategories() {
    const handleScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section className="bg-card px-6 py-18 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}

                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Help Center
                    </span>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Browse by Category
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-muted-foreground">
                        Explore the most common questions about SkillBridge.
                        Select a category to jump directly to the answers.
                    </p>
                </div>

                {/* Cards */}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                whileHover={{
                                    y: -6,
                                }}
                                onClick={() => handleScroll(category.id)}
                                className="group rounded-3xl border bg-card p-7 text-left shadow-sm transition-all hover:border-primary hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                                        <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                                    </div>

                                    <ArrowDown className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-y-1 group-hover:text-primary" />
                                </div>

                                <h3 className="mt-8 text-xl font-bold">
                                    {category.title}
                                </h3>

                                <p className="mt-3 leading-7 text-muted-foreground">
                                    {category.description}
                                </p>

                                <div className="mt-8 flex items-center justify-between border-t pt-5">
                                    <span className="text-sm text-muted-foreground">
                                        Questions
                                    </span>

                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                        {category.questions}
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}