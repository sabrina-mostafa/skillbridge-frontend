"use client";

import { useEffect, useMemo, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";
import InboxSummary from "./InboxSummary";
import InboxFilters from "./InboxFilters";
import InboxTable from "./InboxTable";
import MessageDetailsModal from "./MessageDetailsModal";
import DeleteMessageDialog from "./DeleteMessageDialog";
import { PublicContactMessages } from "@/types/public-contact-form.type";


type Props = {
    allMessages: PublicContactMessages[]
    messages: PublicContactMessages[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default function InboxManager({
    allMessages,
    messages,
    meta,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedMessage, setSelectedMessage] =
        useState<PublicContactMessages | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );
    const [sortBy, setSortBy] = useState(() => {
        const order = searchParams.get("sortOrder");

        return order === "asc"
            ? "oldest"
            : "newest";
    });

    const [userType, setUserType] = useState(
        searchParams.get("userType") ?? "ALL"
    );

    const [inquiryType, setInquiryType] = useState(
        searchParams.get("inquiryType") ?? "ALL"
    );

    const debouncedSearch = useDebounce(search, 400);

    function updateQuery(
        updates: Record<
            string,
            string | undefined
        >
    ) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        Object.entries(updates).forEach(
            ([key, value]) => {
                if (
                    !value ||
                    value === "undefined"
                ) {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            }
        );
        router.push(`${pathname}?${params.toString()}`,
            { scroll: false, }
        );
    }

    // Search
    useEffect(() => {
        const current =
            searchParams.get("searchTerm") ??
            "";

        if (current === debouncedSearch)
            return;

        updateQuery({
            searchTerm:
                debouncedSearch ||
                undefined,
            page: "1",
        });
    }, [debouncedSearch]);

    const summary = useMemo(() => {
        const now = new Date();

        const today = allMessages.filter(
            (message) => {
                const date = new Date(
                    message.createdAt
                );

                return (
                    date.getDate() ===
                    now.getDate() &&
                    date.getMonth() ===
                    now.getMonth() &&
                    date.getFullYear() ===
                    now.getFullYear()
                );
            }
        ).length;

        const last7Days =
            allMessages.filter((message) => {
                const diff =
                    now.getTime() -
                    new Date(
                        message.createdAt
                    ).getTime();

                return (diff <= 7 * 24 * 60 * 60 * 1000);
            }).length;

        return {
            total: allMessages.length,
            today,
            last7Days,
            unread: 0,
        };
    }, [messages, meta]);


    return (
        <div className="space-y-6">
            <SectionHeader
                title="Inbox Management"
                description="Manage and review contact messages submitted by users."
            />

            <InboxSummary
                total={summary.total}
                today={summary.today}
                last7Days={summary.last7Days}
                unread={summary.unread}
            />

            <InboxFilters
                search={search}
                userType={userType}
                inquiryType={inquiryType}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onUserTypeChange={(value) => {
                    setUserType(value);

                    updateQuery({
                        userType: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onInquiryTypeChange={(value) => {
                    setInquiryType(value);

                    updateQuery({
                        inquiryType: value === "ALL" ? undefined : value,
                        page: "1",
                    });
                }}
                onSortChange={(value) => {
                    setSortBy(value);

                    updateQuery({
                        sortBy: "createdAt",
                        sortOrder: value === "oldest" ? "asc" : "desc",
                        page: "1",
                    });
                }}
                onReset={() => {
                    setSearch("");
                    setUserType("ALL");
                    setInquiryType("ALL");
                    setSortBy("newest");

                    router.push(pathname, {
                        scroll: false,
                    });
                }}
            />

            <InboxTable
                messages={messages}
                onView={(
                    message
                ) => {
                    setSelectedMessage(
                        message
                    );
                    setDetailsOpen(
                        true
                    );
                }}
                onDelete={(
                    message
                ) => {
                    setSelectedMessage(
                        message
                    );
                    setDeleteOpen(
                        true
                    );
                }}
            />

            <Pagination
                page={meta?.page ?? 1}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                limit={meta?.limit ?? 10}
                onPageChange={(page) => updateQuery({ page: String(page) })}
                className="max-w-8xl sm:px-6"
            />

            <MessageDetailsModal
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                message={selectedMessage}
            />

            <DeleteMessageDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                message={selectedMessage}
            />
        </div>
    );
}