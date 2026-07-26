"use client";

import { Construction, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type UnderConstructionProps = {
    title?: string;
    description?: string;
    estimatedText?: string;
    backHref?: string;
    backLabel?: string;
};

export default function UnderConstruction({
    title = "Page Under Construction",
    description = "We're crafting this experience with care. This feature isn't available just yet, but it's actively being built and will be released soon.",
    estimatedText = "Thank you for your patience.",
    backHref = "/dashboard",
    backLabel = "Back to Dashboard",
}: UnderConstructionProps) {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border bg-background shadow-2xl">

                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex flex-col items-center px-8 py-16 text-center">

                    {/* Icon */}
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                        <Construction className="h-11 w-11 text-primary" />
                    </div>

                    {/* Badge */}
                    <div className="mb-5 flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-[12px] sm:text-sm font-medium">
                        <Sparkles className="h-4 w-4 text-primary" />
                        New Feature in Development
                    </div>

                    {/* Heading */}
                    <h1 className="text-xl sm:text-4xl font-bold tracking-tight">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-2xl text-[13px] sm:text-md text-muted-foreground leading-7">
                        {description}
                    </p>

                    {/* Footer note */}
                    <div className="mt-8 rounded-xl border bg-muted/50 px-5 py-3 text-sm text-muted-foreground">
                        {estimatedText}
                    </div>

                    {/* Action */}
                    <div className="mt-10">
                        <Button asChild size="lg">
                            <Link href={backHref}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {backLabel}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}