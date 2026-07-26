"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/common/SectionHeader";
import StudentSummary from "./StudentSummary";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";
import StudentDetailsModal from "./StudentDetailsModal";
import StudentManagerSkeleton from "@/components/skeletons/StudentManagerSkeleton";
import { TutorStudent } from "@/types/tutor-student.type";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { getTutorStudents } from "@/utils/dashboard/getTutorStudents";


export default function StudentManager() {
    const [students, setStudents] = useState<TutorStudent[]>([]);
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

    const [selectedStudent, setSelectedStudent] = useState<TutorStudent | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);

            const res = await bookingClientService.getMine({
                page: 1,
                limit: 1000,
                // searchTerm,
            });

            if (res.error || !res.data) {
                toast.error(
                    res.error ?? "Failed to load students."
                );
                return;
            }

            if (res.data) {
                const students = getTutorStudents(
                    res.data.data
                );

                setStudents(students);
            }
            setMeta(res.data.meta);
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        (async () => {
            await fetchStudents();
        })();
    }, [fetchStudents]);

    const summary = useMemo(() => {
        return {
            students: students.length,

            totalSessions: students.reduce(
                (sum, s) => sum + s.totalSessions,
                0
            ),

            completedSessions: students.reduce(
                (sum, s) => sum + s.completedSessions,
                0
            ),

            activeStudents: students.filter(
                (s) => s.upcomingSessions > 0
            ).length,
        };
    }, [students]);

    const filteredStudents = useMemo(() => {
        let result = [...students];

        // Search
        if (search.trim()) {
            const keyword = search.toLowerCase();

            result = result.filter((student) => {
                return (
                    student.student.user.name
                        .toLowerCase()
                        .includes(keyword) ||
                    student.student.user.email
                        .toLowerCase()
                        .includes(keyword) ||
                    (student.student.education ?? "")
                        .toLowerCase()
                        .includes(keyword)
                );
            });
        }

        // Sort
        result.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case "name":
                    comparison = a.student.user.name.localeCompare(
                        b.student.user.name
                    );
                    break;

                case "sessions":
                    comparison =
                        a.totalSessions - b.totalSessions;
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
                    break;
                }
            }
            return sortOrder === "asc"
                ? comparison
                : -comparison;
        });

        return result;
    }, [students, search, sortBy, sortOrder]);


    if (loading) {
        return <StudentManagerSkeleton />;
    }

    return (
        <div className="space-y-8">
            <SectionHeader
                title="My Students"
                description="View and manage students you've taught across all completed tutoring sessions."
            />

            <StudentSummary
                students={summary.students}
                totalSessions={summary.totalSessions}
                completedSessions={summary.completedSessions}
                activeStudents={summary.activeStudents}
            />

            <StudentFilters
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

            <StudentTable
                data={filteredStudents}
                page={page}
                setPage={setPage}
                meta={meta}
                onView={(student) => {
                    setSelectedStudent(student);
                    setDetailsOpen(true);
                }}
            />

            <StudentDetailsModal
                student={selectedStudent}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
        </div>
    );
}