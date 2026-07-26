"use client";

import { Users, Sparkles, ArrowUpRight, GraduationCap, Laptop, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    role: "Students",
    title: "The Ultimate Learning Lounge",
    description: "A digital space designed for focus. Access top-tier mentors and interactive tools to accelerate your academic growth.",
    icon: GraduationCap,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    accent: "from-indigo-500/20 to-transparent",
    items: [
      { label: "Instant Mentorship", icon: Zap },
      { label: "Smart Progress", icon: Laptop },
      { label: "Global Classroom", icon: Globe }
    ],
    className: "lg:col-span-3 lg:row-span-2", 
  },
  {
  role: "Tutors",
  title: "Empower Your Expertise",
  description: "Turn your passion into a global teaching brand with our premium management tools.",
  icon: Users,
  color: "text-cyan-600", 
  bg: "bg-cyan-50/50",   
  accent: "from-cyan-500/10 to-transparent",
  items: [
    { label: "Smart Payouts", icon: Zap },
    { label: "Auto-Scheduling", icon: Laptop }
  ],
  className: "lg:col-span-2 lg:row-span-2",
},
];

export default function PlatformFeatures() {
  return (
    <section className="relative md:py-28 py-18 px-6 overflow-hidden bg-background">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-100/50 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-[1260px] mx-auto">
        {/* Fancy Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-indigo-500 shadow-sm text-slate-600 dark:text-white text-xs font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Experience Excellence
          </motion.div>
          <h2 className="text-4xl md:text-5xl max-w-3xl mx-auto font-black tracking-tight">
            How the Platform Works for <span className="text-primary">Everyone.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
            We&apos;ve removed the friction between teaching and learning.
          </p>
        </div>

        {/* Fancy Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {features.map((section, i) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative rounded-[40px] border border-white/50 bg-white/40 dark:bg-gray-800 backdrop-blur-xl shadow-[0_24px_80px_-15px_rgba(0,0,0,0.05)] p-10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2",
                  section.className
                )}
              >
                {/* Visual Accent Gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                  section.accent
                )} />

                <div>
                  <div className="flex items-center justify-between mb-10">
                    <div className={cn("p-5 rounded-2xl bg-card shadow-xl shadow-slate-200/50 dark:shadow-gray-700 group-hover:scale-110 transition-transform duration-500", section.color)}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <div className="space-y-4">
                    <p className={cn("text-xs font-black uppercase tracking-widest", section.color)}>
                      For {section.role}
                    </p>
                    <h3 className="text-2xl text-black dark:text-gray-300 md:text-3xl font-extrabold">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base max-w-lg">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Sub-Feature Pills */}
                <div className="mt-10 flex flex-wrap gap-4">
                  {section.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-card border border-slate-100 shadow-sm text-sm font-bold text-muted-foreground group-hover:border-slate-200 transition-colors"
                    >
                      <item.icon className={cn("w-4 h-4", section.color)} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}