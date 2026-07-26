"use client";

import React from "react";
import {
  Cpu, Handshake, CreditCard, Flag,
  Smile, Briefcase, Megaphone, Camera,
  Package, PenTool, HeartPulse, Headphones,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const categories = [
  { name: "Label", count: "63,476 Courses", icon: Cpu, color: "text-purple-600", bg: "bg-purple-50 dark: bg-purple-200", iconBg: "bg-white" },
  { name: "Business", count: "52,822 Courses", icon: Handshake, color: "text-emerald-600", bg: "bg-emerald-50 dark: bg-emerald-200", iconBg: "bg-white" },
  { name: "Finance & Accounting", count: "33,841 Courses", icon: CreditCard, color: "text-orange-600", bg: "bg-orange-50 dark: bg-orange-200", iconBg: "bg-white" },
  { name: "IT & Software", count: "22,649 Courses", icon: Flag, color: "text-rose-600", bg: "bg-rose-50 dark: bg-rose-200", iconBg: "bg-white" },
  { name: "Personal Development", count: "20,126 Courses", icon: Smile, color: "text-white", bg: "bg-white dark: bg-white", iconBg: "bg-[#FF6636]", isSpecial: true },
  { name: "Office Productivity", count: "13,932 Courses", icon: Briefcase, color: "text-slate-600", bg: "bg-slate-100 dark: bg-slate-200", iconBg: "bg-white" },
  { name: "Marketing", count: "12,068 Courses", icon: Megaphone, color: "text-indigo-600", bg: "bg-indigo-50 dark: bg-indigo-200", iconBg: "bg-white" },
  { name: "Photography & Video", count: "6,196 Courses", icon: Camera, color: "text-slate-600", bg: "bg-slate-100 dark: bg-slate-200", iconBg: "bg-white" },
  { name: "Lifestyle", count: "2,736 Courses", icon: Package, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-200", iconBg: "bg-white" },
  { name: "Design", count: "2,600 Courses", icon: PenTool, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-200", iconBg: "bg-white" },
  { name: "Health & Fitness", count: "1,678 Courses", icon: HeartPulse, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-200", iconBg: "bg-white" },
  { name: "Music", count: "959 Courses", icon: Headphones, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-200", iconBg: "bg-white" },
];

export default function CategorySection() {
  return (
    <section className="lg:py-24 py-18 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Browse top category
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={cn(
                "flex items-center p-6 rounded-lg transition-all duration-300 border border-transparent",
                cat.bg,
                cat.isSpecial ? "shadow-xl shadow-orange-100/10 border-slate-100" : "hover:border-slate-600 hover:dark:border-white border-2 dark:border-4"
              )}
            >
              <div className={cn(
                "w-12 h-12 shrink-0 flex items-center justify-center rounded-md shadow-sm",
                cat.iconBg
              )}>
                <cat.icon className={cn("w-6 h-6", cat.color)} />
              </div>

              <div className="ml-4">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {cat.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">We have more category & subcategory.</span>
          <a
            href={`/category`}
            className="font-bold text-primary hover:text-[#2178a0] flex items-center gap-1 transition-colors"
          >
            Browse All <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}