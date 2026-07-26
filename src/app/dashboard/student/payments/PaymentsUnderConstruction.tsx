"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Construction,
  CreditCard,
  ArrowLeft,
  Receipt,
  WalletCards,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";


export default function PaymentsUnderConstruction() {
  return (
    <div className="flex min-h-[calc(100vh-220px)] items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border bg-card p-10 shadow-sm">
        {/* Background Glow */}
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <CreditCard className="h-10 w-10 text-primary" />
          </div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Construction className="h-4 w-4" />
            Under Development
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            Payments
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            We&apos;re building a secure payment center where you&apos;ll be able to
            manage bookings, payment history, invoices, and future transactions
            with ease.
          </p>

          {/* Upcoming Features */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-background p-5">
              <WalletCards className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">
                Payment Methods
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Save and manage your preferred payment methods securely.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <Receipt className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">
                Payment History
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access invoices, receipts, and completed payment records.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">
                Secure Checkout
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fast, reliable, and secure payments for every tutoring session.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/student">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            <Button disabled>
              Coming Soon
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}