"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PrivacyHero() {
    return (
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 shadow-sm"
                >
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                        Privacy Policy
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl"
                >
                    Your Privacy
                    <span className="block text-primary">
                        Matters to Us
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground"
                >
                    We are committed to protecting your personal information and
                    maintaining transparency about how SkillBridge collects,
                    uses, and safeguards your data.
                </motion.p>

                <p className="mt-8 text-sm text-muted-foreground">
                    Last updated: July 2026
                </p>

            </div>
        </section>
    );
}