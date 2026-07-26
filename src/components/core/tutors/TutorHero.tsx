import { BadgeCheck, GraduationCap, Star, Users } from "lucide-react";
import Image from "next/image";

import tutorHero1 from "../../../../public/tutors/tutor1.jpeg";
import tutorHero2 from "../../../../public/tutors/tutor2.avif";
import tutorHero3 from "../../../../public/tutors/tutor3.jpeg";
import tutorHero4 from "../../../../public/tutors/tutor4.jpg";


export type allTutorsCountProp = {
    allTutorsCount: number;
}

export default function TutorHero({ allTutorsCount }: allTutorsCountProp) {

    return (
        <div className="relative pt-14 border-b bg-background overflow-hidden">

            {/* GRID PATTERN */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 30px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* GRADIENT BLOBS */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-indigo-400/20 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-violet-400/20 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-[100px]" />
            </div>

            {/* EXTRA GLOW */}
            <div className="absolute -top-32 right-0 w-125 h-125 bg-indigo-400/10 blur-[120px] rounded-full" />

            {/* CONTENT */}
            <div className="relative max-w-7xl mx-auto px-6 py-20">

                <div className="grid xl:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE */}
                    <div>
                        {/* BADGE */}
                        <div
                            className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/80
                dark:bg-gray-900/80
                backdrop-blur-md
                border
                border-primary
                shadow-sm
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
            "
                        >
                            <GraduationCap className="w-4 h-4 text-primary" />
                            Expert Tutors
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
                            Discover Expert Tutors
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            Browse top-rated educators, compare experience,
                            read verified reviews, and find the perfect mentor
                            for your learning journey.
                        </p>

                        {/* STATS */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border bg-card">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                    {allTutorsCount}+ Tutors Available
                                </span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border bg-card">
                                <BadgeCheck className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                    Verified Educators
                                </span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border bg-card">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">
                                    Real-Time Ratings
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE VISUAL */}
                    <div className="flex justify-center">

                        <div className="relative w-92 md:w-130">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative h-34 md:h-52 rounded-3xl overflow-hidden">
                                    <Image src={tutorHero1} fill alt="" className="object-cover" />
                                </div>
                                <div className="relative h-34 md:h-52 rounded-3xl overflow-hidden mt-8">
                                    <Image src={tutorHero2} fill alt="" className="object-cover" />
                                </div>
                                <div className="relative h-34 md:h-52 rounded-3xl overflow-hidden -mt-8">
                                    <Image src={tutorHero3} fill alt="" className="object-cover" />
                                </div>
                                <div className="relative h-34 md:h-52 rounded-3xl overflow-hidden">
                                    <Image src={tutorHero4} fill alt="" className="object-cover" />
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute left-32 sm:-left-14 -top-9 sm:top-20 bg-card border rounded-xl sm:rounded-2xl py-2 px-4 sm:p-4 shadow-xl">
                                <p className="text-sm sm:text-2xl font-bold text-primary">
                                    {allTutorsCount}+
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Expert Tutors
                                </p>
                            </div>

                            <div className="absolute right-30 sm:-right-20 -bottom-5 sm:bottom-2 bg-card border rounded-xl sm:rounded-2xl py-3 px-4 sm:p-4 shadow-xl">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="text-sm sm:text-md font-semibold">
                                        4.9 Rating
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}