"use client";

import {
    CalendarDays,
    FileText,
    Loader2,
    RotateCcw,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    REPORT_TYPES,
    ReportFormat,
    ReportType,
} from "@/types/reports.type";

type Props = {
    type: ReportType;
    format: ReportFormat;
    from: string;
    to: string;
    loading: boolean;

    onTypeChange: (value: ReportType) => void;
    onFormatChange: (value: ReportFormat) => void;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;

    onGenerate: () => void;
    onReset: () => void;
};

export default function ReportGeneratorCard({
    type,
    format,
    from,
    to,
    loading,
    onTypeChange,
    onFormatChange,
    onFromChange,
    onToChange,
    onGenerate,
    onReset,
}: Props) {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="border-b pb-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <FileText className="h-5 w-5 text-primary" />
                            Generate Reports
                        </CardTitle>

                        <CardDescription className="max-w-2xl">
                            Generate platform reports with optional date filters and
                            export them in your preferred format.
                        </CardDescription>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            onClick={onReset}
                            disabled={loading}
                            className="cursor-pointer"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </Button>

                        <Button
                            onClick={onGenerate}
                            disabled={loading}
                            className="min-w-42.5 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-2">
                <div className="rounded-xl border bg-muted/30 p-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Report Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Report Type
                            </label>

                            <Select
                                value={type}
                                onValueChange={(value) =>
                                    onTypeChange(value as ReportType)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {REPORT_TYPES.map((reportType) => (
                                        <SelectItem
                                            key={reportType}
                                            value={reportType}
                                        >
                                            {reportType.charAt(0).toUpperCase() +
                                                reportType.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Export Format */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Export Format
                            </label>

                            <Select
                                value={format}
                                onValueChange={(value) =>
                                    onFormatChange(value as ReportFormat)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {/* <SelectItem value="json">
                                        JSON
                                    </SelectItem> */}

                                    <SelectItem value="csv">
                                        CSV
                                    </SelectItem>

                                    <SelectItem value="xlsx">
                                        Excel (.xlsx)
                                    </SelectItem>

                                    <SelectItem value="pdf">
                                        PDF
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* From */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                From Date
                            </label>

                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    type="date"
                                    value={from}
                                    onChange={(e) =>
                                        onFromChange(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* To */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                To Date
                            </label>

                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    type="date"
                                    value={to}
                                    onChange={(e) =>
                                        onToChange(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}