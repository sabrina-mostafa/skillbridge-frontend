"use client"

import { Button } from "@/components/ui/button";
import { ImageStrip } from "./ImageStrip";
import "country-flag-icons/react/3x2";
import { US, CA, BD, AE, AU } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";


export function Hero() {
  const router = useRouter();

  return (
    <section className="text-center w-full overflow-hidden">

      <div className="flex flex-col pt-20 md:px-0 px-4 bg-background">
        {/* Heading Container */}
        <div className="relative z-10 -mb-2 md:-mb-12.5 xl:-mb-28">
          <p className="text-muted-foreground text-sm md:text-lg font-semibold uppercase tracking-[0.2em] mb-4">
            The Ultimate Education Ecosystem
          </p>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            Connect. Learn. <span className="text-primary font-extrabold italic">Succeed.</span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl px-4 leading-relaxed">
            A comprehensive platform bridging the gap between expert tutors and ambitious students.
            Manage schedules, track progress, and deliver world-class learning, all in one place.
          </p>

          {/* CTA Group */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => router.push("/tutors")}
              className="w-full cursor-pointer sm:w-auto rounded-full px-10 py-7 text-lg font-bold shadow-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Find Your Tutor
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/category")}
              className="w-full cursor-pointer sm:w-auto rounded-full px-10 py-7 text-lg font-bold border-2 hover:bg-slate-50 transition-all"
            >
              Explore Courses
            </Button>
          </div>
        </div>

        {/* Image Strip Div */}
        <div className="relative z-0">
          <ImageStrip />
        </div>
      </div>

      {/* Trusted Section */}
      <div className="pt-8 md:px-0 px-4 pb-20 bg-card md:pt-20">
        <div className="text-xs md:text-lg text-muted-foreground font-bold tracking-[0.3em]">
          EMPOWERING COMMUNITIES IN
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-400 md:text-base font-semibold">
          <span className="flex items-center gap-2 hover:grayscale grayscale-0 transition-all">
            <US title="USA" className="w-5 h-4" /> USA
          </span>

          <span className="flex items-center gap-2 hover:grayscale grayscale-0 transition-all">
            <CA title="Canada" className="w-5 h-4" /> Canada
          </span>

          <span className="flex items-center gap-2 hover:grayscale grayscale-0 transition-all">
            <BD title="Bangladesh" className="w-5 h-4" /> Bangladesh
          </span>

          <span className="flex items-center gap-2 hover:grayscale grayscale-0 transition-all">
            <AE title="UAE" className="w-5 h-4" /> UAE
          </span>

          <span className="flex items-center gap-2 hover:grayscale grayscale-0 transition-all">
            <AU title="Australia" className="w-5 h-4" /> Australia
          </span>
        </div>
      </div>
    </section>
  );
}