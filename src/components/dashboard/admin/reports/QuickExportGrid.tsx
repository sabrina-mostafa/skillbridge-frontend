"use client";

import {
    ArrowRight,
    BookOpen,
    Download,
    FileText,
    FolderTree,
    MessageSquare,
    Star,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const exports = [
    {
        title: "Users",
        description: "Students, tutors and administrators",
        icon: Users,
    },
    {
        title: "Bookings",
        description: "Sessions and booking history",
        icon: BookOpen,
    },
    {
        title: "Reviews",
        description: "Ratings and feedback",
        icon: Star,
    },
    {
        title: "Categories",
        description: "Subjects and course categories",
        icon: FolderTree,
    },
    {
        title: "Messages",
        description: "Contact & support inquiries",
        icon: MessageSquare,
    },
    {
        title: "Full Backup",
        description: "Complete platform export",
        icon: FileText,
    },
];

export default function QuickExportGrid() {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold">
                    Quick Exports
                </h2>

                <p className="text-sm text-muted-foreground">
                    Frequently used reports that can be downloaded instantly.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {exports.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Card
                            key={item.title}
                            className="group transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <Download className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>

                                <Button
                                    variant="ghost"
                                    className="mt-6 w-full justify-between"
                                >
                                    Export

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}