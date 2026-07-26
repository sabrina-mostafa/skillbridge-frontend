"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Import your images
import step1 from "../../../public/landing/step1.jpeg";
import step3 from "../../../public/landing/step2.jpeg";
import step2 from "../../../public/landing/step3.jpeg";

import tutorStep2 from "../../../public/landing/stepT2.jpeg";
import tutorStep3 from "../../../public/landing/stepT3.jpeg";

const studentSteps = [
  {
    number: "01",
    title: "Submit Your Details",
    description: "Share your learning needs and preferences in just a few clicks. We'll handle the matching.",
    image: step1,
  },
  {
    number: "02",
    title: "Match With Tutor",
    description: "We connect you with the best tutor based on subject, level, and personality fit.",
    image: step2,
  },
  {
    number: "03",
    title: "Start Learning Live",
    description: "Join live 1-on-1 sessions and start seeing progress immediately with expert guidance.",
    image: step3,
  },
];

const tutorSteps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Highlight your expertise, certifications, and teaching style to attract students.",
    image: step1,
  },
  {
    number: "02",
    title: "Verify & Approve",
    description: "Our team reviews your credentials within 24 hours to ensure platform quality.",
    image: tutorStep2,
  },
  {
    number: "03",
    title: "Start Earning",
    description: "Accept session requests and manage your teaching schedule with our integrated tools.",
    image: tutorStep3,
  },
];

export function Steps() {
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeSteps = role === "student" ? studentSteps : tutorSteps;

  // Auto-rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [role]);

  return (
    <div className="bg-card w-full">
      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Get started in <span className="text-primary italic">3 steps</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              A seamless experience designed to get you started in minutes.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex p-1.5 bg-slate-100 dark:bg-gray-800 rounded-2xl w-fit h-fit border border-slate-200 dark:border-gray-600">
            <button
              onClick={() => { setRole("student"); setActiveStepIndex(0); }}
              className={`px-8 py-2.5 cursor-pointer rounded-xl text-sm font-bold transition-all duration-200 ${role === "student" ? "bg-white dark:bg-gray-700 text-primary shadow-sm ring-1 ring-black/5" : "text-slate-500 dark:text-slate-200 hover:text-slate-800 dark:hover:text-indigo-500"
                }`}
            >
              I&apos;m a Student
            </button>
            <button
              onClick={() => { setRole("tutor"); setActiveStepIndex(0); }}
              className={`px-8 py-2.5 cursor-pointer rounded-xl text-sm font-bold transition-all duration-200 ${role === "tutor" ? "bg-white dark:bg-gray-700 text-primary shadow-sm ring-1 ring-black/5" : "text-slate-500 dark:text-slate-200 hover:text-slate-800 dark:hover:text-indigo-500"
                }`}
            >
              I&apos;m a Tutor
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Steps List */}
          <div className="space-y-4">
            {activeSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStepIndex(index)}
                className={`group p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${activeStepIndex === index
                    ? "border-slate-100 dark:border-gray-600 bg-slate-50/50 dark:bg-gray-900"
                    : "border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
              >
                <div className="flex gap-6">
                  <span className={`font-black text-2xl ${activeStepIndex === index ? "text-primary" : "text-indigo-200"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Preview (Reverted to your original border design) */}
          <div className="relative sticky top-24">
            <div className="relative aspect-square w-full max-w-125 mx-auto">

              {/* Decorative Background Elements */}
              <div className="absolute inset-0 bg-indigo-900/20 dark:bg-indigo-600/20 rounded-[40px] rotate-3" />
              <div className="absolute inset-0 bg-slate-100 dark:bg-indigo-600/20 rounded-[40px] -rotate-2 border border-slate-200 dark:border-gray-700" />

              {/* The original image container design you had */}
              <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-[40px] overflow-hidden border border-slate-200 dark:border-black shadow-2xl p-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-gray-700">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${role}-${activeStepIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeSteps[activeStepIndex].image}
                        alt="Platform Preview"
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Reverted floating badge to your original text */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-indigo-600 max-w-50 hidden md:block">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">PROVEN QUALITY</p>
                <p className="text-sm font-medium text-muted-foreground italic">&quot;Rigorous vetting ensures you are matched with the highest caliber of academic talent.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}