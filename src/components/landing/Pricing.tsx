"use client";

import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    CalendarClock,
    CreditCard,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Pricing() {
    return (
        <section id="pricing" className="relative overflow-hidden px-6 bg-card py-18 md:py-24">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.08),transparent_60%)]" />

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        <Sparkles className="h-4 w-4" />
                        Transparent Pricing
                    </div>

                    <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                        Invest in Your
                        <span className="block text-primary">
                            Learning Journey
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        SkillBridge connects you directly with experienced tutors.
                        Every tutor sets their own hourly rate, giving you the
                        flexibility to find the perfect match for your goals and
                        budget.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="mx-auto mt-16 max-w-7xl">
                    <div className="grid overflow-hidden rounded-3xl border bg-background shadow-2xl lg:grid-cols-2">
                        {/* Left */}
                        <div className="relative text-white overflow-hidden bg-primary p-10">
                            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                                    <BadgeCheck className="h-4 w-4" />
                                    Most Flexible
                                </div>

                                <h3 className="mt-8 text-3xl font-bold">
                                    One-to-One Tutoring
                                </h3>

                                <div className="mt-8 flex items-end gap-2">
                                    <span className="text-6xl font-black">
                                        ৳500+
                                    </span>

                                    <span className="pb-2 text-lg opacity-80">
                                        /hour
                                    </span>
                                </div>

                                <p className="mt-5 leading-8">
                                    Pricing varies depending on the tutor&apos;s
                                    expertise, experience, subject, and session
                                    duration.
                                </p>

                                <Button
                                    asChild
                                    size="lg"
                                    variant="secondary"
                                    className="mt-10 rounded-lg px-8 py-7"
                                >
                                    <Link href="/tutors">
                                        <p className="text-lg font-bold">Browse Tutors</p>

                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="p-10">
                            <h4 className="text-xl font-bold">
                                What&apos;s Included
                            </h4>

                            <div className="mt-8 space-y-6">
                                <Feature
                                    icon={CalendarClock}
                                    title="Flexible Scheduling"
                                    description="Book sessions whenever it fits your schedule."
                                />

                                <Feature
                                    icon={CreditCard}
                                    title="Pay Only for Sessions"
                                    description="No subscriptions or recurring charges."
                                />

                                <Feature
                                    icon={ShieldCheck}
                                    title="Verified Tutors"
                                    description="Learn from trusted and experienced educators."
                                />

                                <Feature
                                    icon={BadgeCheck}
                                    title="Transparent Pricing"
                                    description="See tutor rates before booking with no hidden fees."
                                />
                            </div>

                            <div className="mt-10 rounded-2xl bg-muted p-5">
                                <p className="text-sm leading-7 text-muted-foreground">
                                    <span className="font-semibold text-foreground">
                                        Good to know:
                                    </span>{" "}
                                    Every tutor sets their own hourly rate.
                                    Premium tutors with more experience may
                                    charge higher fees, while new tutors often
                                    offer more affordable rates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

type FeatureProps = {
    icon: React.ElementType;
    title: string;
    description: string;
};

function Feature({
    icon: Icon,
    title,
    description,
}: FeatureProps) {
    return (
        <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
            </div>

            <div>
                <h5 className="font-semibold">
                    {title}
                </h5>

                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}