"use client";

import { format } from "date-fns";
import {
    Download,
    Eye,
    FileSpreadsheet,
    FileText,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ReportItem = {
    id: string;
    name: string;
    type: string;
    format: "CSV" | "PDF" | "XLSX";
    size: string;
    createdAt: Date;
    createdBy: string;
};

const reports: ReportItem[] = [
    {
        id: "1",
        name: "Users Report",
        type: "Users",
        format: "CSV",
        size: "218 KB",
        createdAt: new Date(),
        createdBy: "Admin",
    },
    {
        id: "2",
        name: "Bookings Report",
        type: "Bookings",
        format: "PDF",
        size: "1.6 MB",
        createdAt: new Date(),
        createdBy: "Admin",
    },
    {
        id: "3",
        name: "Reviews Report",
        type: "Reviews",
        format: "XLSX",
        size: "540 KB",
        createdAt: new Date(),
        createdBy: "Admin",
    },
];

export default function RecentReportsTable() {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold">
                    Recent Reports
                </h2>

                <p className="text-sm text-muted-foreground">
                    Recently generated reports available for download.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Format</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Generated</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="w-16">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {reports.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="py-16 text-center text-muted-foreground"
                                >
                                    No reports generated yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                {report.format === "PDF" ? (
                                                    <FileText className="h-5 w-5 text-primary" />
                                                ) : (
                                                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                                                )}
                                            </div>

                                            <div>
                                                <p className="font-medium">
                                                    {report.name}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Ready to download
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {report.type}
                                    </TableCell>

                                    <TableCell>
                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                            {report.format}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        {report.size}
                                    </TableCell>

                                    <TableCell>
                                        {format(
                                            report.createdAt,
                                            "dd MMM yyyy"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {report.createdBy}
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                asChild
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>

                                                <DropdownMenuItem>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}