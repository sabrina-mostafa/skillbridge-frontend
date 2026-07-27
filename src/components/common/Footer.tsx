"use client";

import Link from "next/link";
import {
    BookOpen,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Send,
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


const quickLinks = [
    {
        title: "Platform",
        links: [
            { label: "Home", href: "/" },
            { label: "Find Tutors", href: "/tutors" },
            { label: "Categories", href: "/category" },
            { label: "Pricing", href: "/#pricing" },
            { label: "About", href: "/about" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Contact", href: "/#contact" },
            { label: "FAQ", href: "/faq" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Explore Courses", href: "/category" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-3xl font-black tracking-tight"
                        >
                            Skill
                            <span className="text-primary">
                                Bridge
                            </span>
                        </Link>

                        <p className="mt-6 max-w-md leading-8 text-muted-foreground">
                            SkillBridge helps students connect with qualified
                            tutors for personalized one-to-one learning.
                            Discover trusted educators, flexible scheduling,
                            and an enjoyable learning experience designed for
                            modern education.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Verified Tutors
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Personalized Learning
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Flexible Sessions
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <BookOpen className="h-5 w-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Multiple Categories
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}

                    {quickLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-6 text-lg font-semibold">
                                {section.title}
                            </h3>

                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}

                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Stay Connected
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-muted-foreground">
                            Subscribe to receive platform updates, learning
                            tips, and educational news.
                        </p>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Your email"
                                className="rounded-full"
                            />

                            <Button
                                size="icon"
                                className="rounded-full"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="mt-8 space-y-5">
                            <div className="flex gap-3">
                                <Mail className="mt-1 h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    support@skillbridge.com
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <Phone className="mt-1 h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    +880 1234-567890
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <MapPin className="mt-1 h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Chattogram, Bangladesh
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            {[
                                FaFacebookF,
                                FaInstagram,
                                FaXTwitter,
                                FaLinkedinIn,
                            ].map((Icon, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            ))}
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

                    <div className="flex flex-wrap gap-6">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-primary"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-primary"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/#contact"
                            className="hover:text-primary"
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}