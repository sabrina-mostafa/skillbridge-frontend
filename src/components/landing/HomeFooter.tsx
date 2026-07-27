"use client";

import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Users,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomeFooter() {
    return (
        <footer className="">
            {/* CTA */}
            <section className="bg-card border-b">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-20 text-center lg:flex-row lg:text-left">
                    <div className="max-w-2xl">
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Join SkillBridge
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Start Learning with
                            <span className="block text-primary">
                                Expert Tutors Today
                            </span>
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Connect with verified tutors, schedule one-on-one
                            sessions, and accelerate your learning journey
                            anytime, anywhere.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        className="rounded-xl px-8 py-7"
                        asChild
                    >
                        <Link href="/tutors">
                            Find Your Tutor

                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Main Footer */}
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-18 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                {/* Brand */}
                <div>
                    <Link
                        href="/"
                        className="text-3xl font-black"
                    >
                        Skill
                        <span className="text-primary">
                            Bridge
                        </span>
                    </Link>

                    <p className="mt-6 max-w-md leading-8 text-muted-foreground">
                        SkillBridge connects students with qualified tutors
                        through personalized one-on-one learning experiences.
                        Discover expert guidance, flexible scheduling, and a
                        seamless tutoring platform designed for success.
                    </p>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            Verified Tutors
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 text-primary" />
                            Personalized Learning
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4 text-primary" />
                            Flexible Scheduling
                        </div>
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="mb-5 font-bold">
                        Explore
                    </h3>

                    <div className="space-y-3 text-sm">
                        <Link href="/" className="block hover:text-primary">
                            Home
                        </Link>

                        <Link href="/tutors" className="block hover:text-primary">
                            Find Tutors
                        </Link>

                        <Link href="/category" className="block hover:text-primary">
                            Categories
                        </Link>

                        <Link href="/about" className="block hover:text-primary">
                            About Us
                        </Link>

                        <Link href="/#contact" className="block hover:text-primary">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Tutors */}
                <div>
                    <h3 className="mb-5 font-bold">
                        For Tutors
                    </h3>

                    <div className="space-y-3 text-sm">
                        <Link href="/" className="block hover:text-primary">
                            Become a Tutor
                        </Link>

                        <Link href="/" className="block hover:text-primary">
                            Tutor Dashboard
                        </Link>

                        <Link href="/faq" className="block hover:text-primary">
                            FAQs
                        </Link>

                        <Link href="/privacy-policy" className="block hover:text-primary">
                            Privacy Policy
                        </Link>

                        <Link href="/terms" className="block hover:text-primary">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-5 font-bold">
                        Stay Updated
                    </h3>

                    <p className="mb-5 text-sm leading-7 text-muted-foreground">
                        Subscribe to receive learning tips, platform updates,
                        and exclusive announcements.
                    </p>

                    <div className="w-full flex flex-row lg:flex-col gap-2">
                        <Input
                            placeholder="Enter your email"
                            className="lg:w-full"
                        />

                        <Button className="w-1/3 lg:w-full">
                            Subscribe
                        </Button>
                    </div>

                    <div className="mt-8 space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-primary" />
                            support@skillbridge.com
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-primary" />
                            +880 1234-567890
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-primary" />
                            Chattogram, Bangladesh
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} SkillBridge. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link href="#">
                            <FaFacebookF className="h-5 w-5 transition hover:text-primary" />
                        </Link>

                        <Link href="#">
                            <FaInstagram className="h-5 w-5 transition hover:text-primary" />
                        </Link>

                        <Link href="#">
                            <FaXTwitter className="h-5 w-5 transition hover:text-primary" />
                        </Link>

                        <Link href="#">
                            <FaLinkedinIn className="h-5 w-5 transition hover:text-primary" />
                        </Link>
                    </div>

                    <div className="flex gap-6">
                        <Link href="/privacy-policy">
                            Privacy
                        </Link>

                        <Link href="/terms">
                            Terms
                        </Link>

                        <Link href="/#contact">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}