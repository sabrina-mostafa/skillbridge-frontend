"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/common/SectionHeader";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { StudentTutor } from "@/types/tutor-student.type";
import TutorSummary from "./TutorSummary";
import TutorFilters from "./TutorFilters";
import TutorTable from "./TutorTable";
import TutorDetailsModal from "./TutorDetailsModal";
import TutorManagerSkeleton from "@/components/skeletons/TutorManagerSkeleton";
import { getStudentTutors } from "@/utils/dashboard/getStudentTutors";


export default function TutorManager() {
    const [tutors, setTutors] = useState<StudentTutor[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [sortOrder, setSortOrder] = useState("desc");

    const [page, setPage] = useState(1);

    const [meta, setMeta] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [selectedTutor, setSelectedTutor] = useState<StudentTutor | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const fetchTutors = useCallback(async () => {
        try {
            setLoading(true);

            const res = await bookingClientService.getMine({
                page: 1,
                limit: 1000,
            });

            if (res.error || !res.data) {
                toast.error(res.error ?? "Failed to load tutors.");
                return;
            }

            const tutors = getStudentTutors(res.data.data);

            setTutors(tutors);
            setMeta(res.data.meta);
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchTutors();
        })();
    }, [fetchTutors]);

    const summary = useMemo(() => {
        return {
            tutors: tutors.length,

            totalSessions: tutors.reduce(
                (sum, tutor) => sum + tutor.totalSessions,
                0
            ),

            completedSessions: tutors.reduce(
                (sum, tutor) => sum + tutor.completedSessions,
                0
            ),

            activeTutors: tutors.filter(
                (tutor) => tutor.upcomingSessions > 0
            ).length,
        };
    }, [tutors]);

    const filteredTutors = useMemo(() => {
        const result = [...tutors];

        if (search.trim()) {
            const keyword = search.toLowerCase();

            return result
                .filter((tutor) => {
                    return (
                        tutor.tutor.user.name
                            .toLowerCase()
                            .includes(keyword) ||
                        tutor.tutor.user.email
                            .toLowerCase()
                            .includes(keyword) ||
                        (tutor.tutor.education ?? "")
                            .toLowerCase()
                            .includes(keyword)
                    );
                })
                .sort((a, b) => {
                    let comparison = 0;

                    switch (sortBy) {
                        case "name":
                            comparison =
                                a.tutor.user.name.localeCompare(
                                    b.tutor.user.name
                                );
                            break;

                        case "sessions":
                            comparison =
                                a.totalSessions -
                                b.totalSessions;
                            break;

                        case "completed":
                            comparison =
                                a.completedSessions -
                                b.completedSessions;
                            break;

                        case "recent":
                        default: {
                            const aDate = a.latestBooking?.date
                                ? new Date(
                                    a.latestBooking.date
                                ).getTime()
                                : 0;

                            const bDate = b.latestBooking?.date
                                ? new Date(
                                    b.latestBooking.date
                                ).getTime()
                                : 0;

                            comparison = aDate - bDate;
                        }
                    }

                    return sortOrder === "asc"
                        ? comparison
                        : -comparison;
                });
        }

        return result.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case "name":
                    comparison =
                        a.tutor.user.name.localeCompare(
                            b.tutor.user.name
                        );
                    break;

                case "sessions":
                    comparison =
                        a.totalSessions -
                        b.totalSessions;
                    break;

                case "completed":
                    comparison =
                        a.completedSessions -
                        b.completedSessions;
                    break;

                case "recent":
                default: {
                    const aDate = a.latestBooking?.date
                        ? new Date(a.latestBooking.date).getTime()
                        : 0;

                    const bDate = b.latestBooking?.date
                        ? new Date(b.latestBooking.date).getTime()
                        : 0;

                    comparison = aDate - bDate;
                }
            }

            return sortOrder === "asc"
                ? comparison
                : -comparison;
        });
    }, [tutors, search, sortBy, sortOrder]);

    if (loading) {
        return <TutorManagerSkeleton />;
    }

    return (
        <div className="space-y-8">
            <SectionHeader
                title="My Tutors"
                description="Browse all tutors you've booked sessions with, review your learning history, and access their profiles."
            />

            <TutorSummary
                tutors={summary.tutors}
                totalSessions={summary.totalSessions}
                completedSessions={summary.completedSessions}
                activeTutors={summary.activeTutors}
            />

            <TutorFilters
                search={search}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSearchChange={setSearch}
                onSortByChange={setSortBy}
                onSortOrderChange={setSortOrder}
                onClear={() => {
                    setSearch("");
                    setSortBy("recent");
                    setSortOrder("desc");
                }}
            />

            <TutorTable
                data={filteredTutors}
                page={page}
                setPage={setPage}
                meta={meta}
                onView={(tutor) => {
                    setSelectedTutor(tutor);
                    setDetailsOpen(true);
                }}
            />

            <TutorDetailsModal
                tutor={selectedTutor}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
        </div>
    );
}