"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Star,
    Users,
    BarChart,
    Clock,
} from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";
import TutorHero from "./TutorHero";
import TutorFilterBar from "./TutorFilterBar";
import Pagination from "@/components/common/Pagination";
import { Tutor } from "@/types/tutor.types";


type AllTutorsClientProps = {
    allTutors: Tutor[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    allTutorsCount: number;
};


export default function AllTutorsClient({ allTutors, meta, allTutorsCount }: AllTutorsClientProps) {

    const { setQuery } = useQueryParams();


    return (
        <section className="min-h-screen bg-background">

            {/* ================= HERO ================= */}
            <TutorHero allTutorsCount={allTutorsCount} />

            <div className="max-w-7xl mx-auto pt-12 pb-6">

                {/* ================= FILTER BAR ================= */}
                <TutorFilterBar />

                {/* ================= GRID ================= */}
                <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {allTutors.map((tutor: Tutor) => (
                        <Link
                            key={tutor.id}
                            href={`/tutors/${tutor.id}`}
                            className="group"
                        >
                            <div
                                className="
                                    relative
                                    rounded-2xl
                                    border
                                    bg-card
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                    hover:border-primary/30
                                "
                            >

                                {/* IMAGE */}
                                <div className="relative h-52 w-full overflow-hidden">
                                    <Image
                                        src={tutor.user?.image || "/placeholder.png"}
                                        alt={tutor.user?.name || "Tutor"}
                                        fill
                                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* subtle overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 space-y-4">

                                    {/* NAME */}
                                    <div>
                                        <h2 className="text-xl font-semibold group-hover:text-primary transition">
                                            {tutor.user?.name}
                                        </h2>

                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {tutor.bio}
                                        </p>
                                    </div>

                                    {/* RATING */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-semibold">
                                                {tutor.avgRating?.toFixed(1) || "0.0"}
                                            </span>
                                            <span className="text-muted-foreground">
                                                ({tutor.totalReviews})
                                            </span>
                                        </div>

                                        {tutor.isFeatured && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* STATS */}
                                    <div className="grid grid-cols-3 gap-2 pt-4 border-t text-xs text-muted-foreground">

                                        <div className="flex flex-col items-center">
                                            <Users className="w-4 h-4 mb-1" />
                                            <span className="font-medium text-foreground">Students</span>
                                            <span>20+</span>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <BarChart className="w-4 h-4 mb-1" />
                                            <span className="font-medium text-foreground">Exp</span>
                                            <span>{tutor.experience}</span>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <Clock className="w-4 h-4 mb-1" />
                                            <span className="font-medium text-foreground">Rate</span>
                                            <span>{tutor.hourlyRate}/hr</span>
                                        </div>

                                    </div>

                                    {/* CTA hint */}
                                    <div className="pt-2 text-xs text-center text-primary opacity-0 group-hover:opacity-100 transition">
                                        View Profile →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ================= PAGINATION ================= */}
            <Pagination
                page={meta?.page || 1}
                total={meta?.total || 0}
                totalPages={meta?.totalPages || 1}
                limit={9}
                onPageChange={(p) => setQuery("page", String(p))}
            />

        </section>
    );
}