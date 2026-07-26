"use client";

import { useState } from "react";
import { Check, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Feature {
    title: string;
    description: string;
    iconBgColor: string;
}

const features: Feature[] = [
    {
        title: "Personalized 1:1 Tutoring",
        description: "Tailored educational pathways that match students with ideal mentors for focused learning.",
        iconBgColor: "bg-indigo-600",
    },
    {
        title: "Dynamic Scheduling",
        description: "Seamlessly coordinate across global time zones with automated availability management.",
        iconBgColor: "bg-emerald-600",
    },
    {
        title: "Transparent Financial",
        description: "Streamlined billing cycles with granular session reporting and no hidden administrative fees.",
        iconBgColor: "bg-amber-600",
    },
    {
        title: "Performance Analytics",
        description: "Data-driven insights and structured session histories to track academic growth effectively.",
        iconBgColor: "bg-pink-600",
    },
];

const FeatureItem = ({ title, description, iconBgColor }: Feature) => (
    <Card className="flex flex-row items-start p-5 mb-4 border-slate-100/80 shadow-sm last:mb-0 hover:shadow-md transition-all duration-300 rounded-2xl bg-white/80 dark:bg-gray-700 backdrop-blur-md ring-1 ring-slate-900/5">
        <div
            className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mr-4 text-white mt-0.5 shadow-lg",
                iconBgColor
            )}
        >
            <Check className="w-5 h-5 stroke-3" />
        </div>

        <div className="flex flex-col">
            <h3 className="text-[18px] font-bold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">{description}</p>
        </div>
    </Card>
);

export default function BenefitsSection() {
    const [isHovered, setIsHovered] = useState(false);
    const loopedFeatures = [...features, ...features];

    return (
        <section className="w-full bg-background py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side */}
                <div className="space-y-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
             bg-white/80 dark:bg-gray-900/80 
             backdrop-blur-md 
             border border-primary 
             shadow-sm 
             text-slate-700 dark:text-slate-200 
             text-xs font-semibold uppercase tracking-[0.2em]"
                        >
                            <Rocket className="w-4 h-4 text-primary" />
                            Platform Advantages
                        </motion.div>
                        
                        <h2 className="mt-6 text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
                            An ecosystem designed for <span className="text-primary">educational excellence.</span>
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Elevate your tutoring experience with an enterprise-grade management system. From global scheduling to performance tracking, we provide the tools necessary for modern education at scale.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-200 flex gap-10">
                        <div>
                            <p className="text-2xl font-bold">99.9%</p>
                            <p className="text-sm text-muted-foreground">Uptime Reliability</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">24/7</p>
                            <p className="text-sm text-muted-foreground">Global Support</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Animated Feature Cards */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Decorative Gradient Blur */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl" />

                    <div className="relative h-[480px] cursor-pointer overflow-hidden mask-fade-edges">
                        <motion.div
                            className="space-y-4"
                            animate={isHovered ? {} : { y: ["0%", "-60%"] }}
                            transition={{
                                duration: 25,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {loopedFeatures.map((feature, index) => (
                                <FeatureItem key={`${feature.title}-${index}`} {...feature} />
                            ))}
                        </motion.div>

                        {/* Overlay Gradients */}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-50/50 dark:from-slate-200/200 to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50/50 dark:from-slate-200/200 to-transparent z-10 pointer-events-none" />
                    </div>
                </div>
            </div>

            <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
        </section>
    );
}