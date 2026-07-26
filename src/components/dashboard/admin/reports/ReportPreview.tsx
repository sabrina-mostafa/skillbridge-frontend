"use client";

import {
    Download,
    FileSpreadsheet,
    FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingsReportResponse, CategoriesReportResponse, ContactsReportResponse, OverviewReport, ReportFormat, ReportResponse, ReportType, ReviewsReportResponse, UsersReportResponse } from "@/types/reports.type";
import OverviewPreview from "./OverviewPreview";
import UsersPreview from "./UsersPreview";
import BookingsPreview from "./BookingsPreview";
import CategoriesPreview from "./CategoriesPreview";
import ReviewsPreview from "./ReviewsPreview";
import ContactsPreview from "./ContactsPreview";
import { cn } from "@/lib/utils";



type Props = {
    type: ReportType;
    format: ReportFormat;
    loading: boolean;
    data: ReportResponse | null;

    onExport?: (
        type: ReportType,
        format: Exclude<ReportFormat, "json">
    ) => void;
};

const REPORT_INFO: Record<
    ReportType,
    {
        title: string;
        description: string;
    }
> = {
    overview: {
        title: "Overview Report",
        description:
            "Platform summary including users, bookings, reviews and contacts.",
    },

    users: {
        title: "Users Report",
        description:
            "Students, tutors and administrators.",
    },

    bookings: {
        title: "Bookings Report",
        description:
            "Booking history and session records.",
    },

    reviews: {
        title: "Reviews Report",
        description:
            "Ratings and review information.",
    },

    categories: {
        title: "Categories Report",
        description:
            "Subjects and category statistics.",
    },

    contacts: {
        title: "Contact Messages",
        description:
            "Support and contact inquiries.",
    },
};

export default function ReportPreview({
    type,
    format,
    loading,
    data,
    onExport,
}: Props) {

    const reportType: ReportType = data?.type ?? type;
    const reportInfo = REPORT_INFO[reportType];

    const renderContent = () => {
        switch (reportType) {
            case "overview":
                return <OverviewPreview data={data as OverviewReport} />;

            case "users":
                return <UsersPreview users={(data as UsersReportResponse).data} />;

            case "bookings":
                return (
                    <BookingsPreview
                        bookings={(data as BookingsReportResponse).data}
                    />
                );

            case "reviews":
                return (
                    <ReviewsPreview
                        reviews={(data as ReviewsReportResponse).data}
                    />
                );

            case "categories":
                return (
                    <CategoriesPreview
                        categories={(data as CategoriesReportResponse).data}
                    />
                );

            case "contacts":
                return (
                    <ContactsPreview
                        contacts={(data as ContactsReportResponse).data}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <section className="rounded-xl border bg-background">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        {reportInfo.title}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {reportInfo.description}
                    </p>
                </div>

                {!!data && !loading && (
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={format === "csv" ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "cursor-pointer",
                                format === "csv" && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => onExport?.(reportType, "csv")}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            CSV
                        </Button>

                        <Button
                            variant={format === "xlsx" ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "cursor-pointer",
                                format === "xlsx" && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => onExport?.(reportType, "xlsx")}
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Excel
                        </Button>

                        <Button
                            variant={format === "pdf" ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "cursor-pointer",
                                format === "pdf" && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => onExport?.(reportType, "pdf")}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                        </Button>
                    </div>
                )}
            </div>

            <Separator />

            <div className="min-h-100 p-6">
                {loading ? (
                    <div className="flex h-105 items-center justify-center">
                        <div className="text-center">
                            <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />

                            <h3 className="font-medium">
                                Generating report...
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Please wait while
                                we prepare your
                                report.
                            </p>
                        </div>
                    </div>
                ) : !data ? (
                    <div className="flex h-105 items-center justify-center">
                        <div className="max-w-sm text-center">
                            <FileText className="mx-auto mb-5 h-12 w-12 text-muted-foreground/30" />

                            <h3 className="text-lg font-semibold">
                                No Report Generated
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Choose a report
                                type and optional
                                date range, then
                                click{" "}
                                <span className="font-medium text-foreground">
                                    Generate
                                    Report
                                </span>{" "}
                                to preview the
                                data.
                            </p>
                        </div>
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        </section>
    );
}