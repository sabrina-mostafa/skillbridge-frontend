"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Construction,
  Wallet,
  Sparkles,
  ArrowLeft,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EarningsUnderConstruction() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-6 py-12">
      <Card className="w-full max-w-3xl overflow-hidden border shadow-sm">
        <CardContent className="relative p-10 md:p-14">
          {/* Background decoration */}
          <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
            >
              <Wallet className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 text-3xl font-bold md:text-4xl"
            >
              Earnings Dashboard
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Construction className="h-4 w-4" />
              Under Construction
            </motion.div>

            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
              We&apos;re building a powerful earnings dashboard where you&apos;ll be able
              to monitor your income, completed session revenue, payout history,
              upcoming payments, and detailed financial analytics.
            </p>

            <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-muted/40 p-5">
                <Wallet className="mb-3 h-8 w-8 text-primary" />
                <h3 className="font-semibold">Revenue Overview</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Track your total and monthly earnings.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/40 p-5">
                <Clock3 className="mb-3 h-8 w-8 text-primary" />
                <h3 className="font-semibold">Payout History</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  View completed and pending payouts.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/40 p-5">
                <Sparkles className="mb-3 h-8 w-8 text-primary" />
                <h3 className="font-semibold">Insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Analyze your tutoring performance and growth.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-10 rounded-full px-8"
            >
              <Link href="/dashboard/tutor">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}