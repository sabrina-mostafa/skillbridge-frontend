"use client";

import {
    Mail,
    MailPlus,
    CalendarDays,
    Inbox,
} from "lucide-react";
import { SummaryCard } from "../../common/SummaryCard";



type Props = {
    total: number;
    today: number;
    last7Days: number;
    unread: number;
};

export default function InboxSummary({
    total,
    today,
    last7Days,
    unread,
}: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Total Messages"
                value={total}
                description="All contact inquiries"
                icon={Mail}
            />

            <SummaryCard
                title="Today"
                value={today}
                description="Received today"
                icon={MailPlus}
            />

            <SummaryCard
                title="Last 7 Days"
                value={last7Days}
                description="Recent inquiries"
                icon={CalendarDays}
            />

            <SummaryCard
                title="Unread"
                value={unread}
                description="Awaiting response"
                icon={Inbox}
            />
        </div>
    );
}