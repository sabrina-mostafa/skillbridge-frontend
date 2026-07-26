"use client";

import { CreditCard, Construction } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PaymentsUnderConstruction() {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-10 w-10 text-primary" />
                </div>

                <Badge
                    variant="secondary"
                    className="mt-6"
                >
                    <Construction className="mr-2 h-3.5 w-3.5" />
                    Under Development
                </Badge>

                <h1 className="mt-5 text-3xl font-bold tracking-tight">
                    Payments Module Coming Soon
                </h1>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                    We&apos;re building a complete payment management system
                    for administrators. Soon you&apos;ll be able to monitor
                    transactions, verify payments, process refunds,
                    manage payouts, and view detailed financial reports
                    from one place.
                </p>

                <div className="mt-10 grid w-full max-w-3xl gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <FeatureCard title="Transactions" />
                    <FeatureCard title="Payouts" />
                    <FeatureCard title="Refunds" />
                    <FeatureCard title="Revenue Analytics" />
                </div>

                <Button
                    disabled
                    className="mt-10 cursor-not-allowed"
                >
                    Coming Soon
                </Button>
            </CardContent>
        </Card>
    );
}

function FeatureCard({
    title,
}: {
    title: string;
}) {
    return (
        <div className="rounded-xl border bg-muted/40 p-5">
            <h3 className="font-medium">{title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">
                This feature is currently in development.
            </p>
        </div>
    );
}