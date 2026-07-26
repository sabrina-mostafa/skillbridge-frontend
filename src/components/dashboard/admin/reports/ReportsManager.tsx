"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import SectionHeader from "@/components/common/SectionHeader";
import ReportGeneratorCard from "./ReportGeneratorCard";
import ReportPreview from "./ReportPreview";

import { adminClientService } from "@/services/admin/admin.client.service";
import { ReportFormat, ReportResponse, ReportType } from "@/types/reports.type";

export default function ReportsManager() {
    const [type, setType] = useState<ReportType>("overview");
    const [format, setFormat] = useState<ReportFormat>("pdf");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [report, setReport] = useState<ReportResponse | null>(null);

    const {
        mutateAsync: generatePreview,
        isPending,
    } = useMutation({
        mutationFn: () =>
            adminClientService.getReports({
                type,
                ...(from && { from }),
                ...(to && { to }),
            }),
    });

    const handlePreview = async () => {
        try {
            const response = await generatePreview();
            setReport(response.data);
        } catch {
            toast.error("Failed to generate report.");
        }
    };

    const handleReset = () => {
        setType("overview");
        setFormat("pdf");
        setFrom("");
        setTo("");

        setReport(null);
    };

    const handleExport = async (
        reportType: ReportType,
        exportFormat: Exclude<ReportFormat, "json">
    ) => {
        try {
            await adminClientService.generateReport(reportType, {
                from,
                to,
                format: exportFormat,
            });

            toast.success("Report downloaded successfully.");
        } catch {
            toast.error("Failed to export report.");
        }
    };


    return (
        <div className="space-y-8">
            <SectionHeader
                title="Reports"
                description="Generate, preview and export platform reports."
            />

            <ReportGeneratorCard
                type={type}
                format={format}
                from={from}
                to={to}
                loading={isPending}
                onTypeChange={setType}
                onFormatChange={setFormat}
                onFromChange={setFrom}
                onToChange={setTo}
                onGenerate={handlePreview}
                onReset={handleReset}
            />

            <ReportPreview
                type={type}
                format={format}
                loading={isPending}
                data={report}
                onExport={handleExport}
            />
        </div>
    );
}