"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Target,
    Eye,
    Rocket,
    ShieldCheck,
} from "lucide-react";
import missionImage from "../../../public/about/mission.avif"



const cards = [
    {
        icon: Target,
        title: "Our Mission",
        description:
            "To make high-quality education accessible by connecting students with verified tutors through a secure, flexible, and personalized learning platform.",
    },
    {
        icon: Eye,
        title: "Our Vision",
        description:
            "To become the world's most trusted one-to-one learning marketplace where every learner can unlock their full potential.",
    },
];

export default function MissionVision() {
    return (
        <section className="relative overflow-hidden px-6 py-24">
            {/* Background */}

            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-104 w-104 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
                
                {/* LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .6 }}
                    viewport={{ once: true }}
                >
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        Mission & Vision
                    </span>

                    <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                        Empowering Education
                        <span className="block text-primary">
                            One Student at a Time
                        </span>
                    </h2>

                    <p className="mt-8 text-lg leading-8 text-muted-foreground">
                        At SkillBridge, we believe that education should be
                        personal, accessible, and inspiring. Every student
                        deserves guidance from passionate educators, while every
                        tutor deserves a platform that helps them grow.
                    </p>

                    <div className="mt-10 space-y-6">
                        {cards.map((card) => (
                            <motion.div
                                key={card.title}
                                whileHover={{ y: -4 }}
                                className="rounded-3xl border bg-card/80 p-7 shadow-lg backdrop-blur transition-all hover:border-primary/30 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="rounded-2xl bg-primary/10 p-4">
                                        <card.icon className="h-7 w-7 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {card.title}
                                        </h3>

                                        <p className="mt-3 leading-8 text-muted-foreground">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="overflow-hidden rounded-[2rem] border bg-card shadow-2xl">
                        <Image
                            src={missionImage}
                            alt="Tutor mentoring a student"
                            width={700}
                            height={850}
                            className="h-162.5 w-full object-cover"
                        />
                    </div>

                    {/* Floating Card */}
                    <div className="absolute -left-8 top-12 rounded-3xl border bg-background/95 p-4 md:p-6 shadow-xl backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-primary/10 p-4">
                                <Rocket className="h-4 md:h-7 w-4 md:w-7 text-primary" />
                            </div>

                            <div>
                                <p className="text-xl md:text-3xl font-bold">
                                    Future Ready
                                </p>

                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Modern Learning Experience
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card */}
                    <div className="absolute -right-8 bottom-12 rounded-3xl border bg-background/95 p-4 md:p-6 shadow-xl backdrop-blur">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-primary/10 p-4">
                                <ShieldCheck className="h-4 md:h-7 w-4 md:w-7 text-primary" />
                            </div>

                            <div>
                                <p className="text-xl md:text-3xl font-bold">
                                    Trusted
                                </p>

                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Verified Tutors & Secure Platform
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}