"use client";

import { format } from "date-fns";
import {
  BookOpen,
  CalendarDays,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";

import FormModal from "@/components/common/FormModal";
import { PublicContactMessages } from "@/types/public-contact-form.type";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: PublicContactMessages | null;
};

export default function MessageDetailsModal({
  open,
  onOpenChange,
  message,
}: Props) {
  if (!message) return null;

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Contact Message"
      className="sm:max-w-2xl"
    >
      <div className="space-y-6">
        {/* Sender Information */}
        <section className="rounded-xl border bg-muted/20 p-5">
          <h3 className="mb-4 text-sm font-semibold">
            Sender Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div>
                <p className="font-semibold">
                  {message.fullName}
                </p>

                <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {message.userType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm text-muted-foreground">
                {message.email}
              </span>
            </div>

            {message.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  {message.phone}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Inquiry Type */}
        <section className="rounded-xl border p-5">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />

            <h3 className="text-sm font-semibold">
              Inquiry Type
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {message.inquiryType.map((item) => (
              <span
                key={item}
                className="rounded-lg border bg-muted px-3 py-1.5 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Message */}
        <section className="rounded-xl border p-5">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />

            <h3 className="text-sm font-semibold">
              Message
            </h3>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {message.message}
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />

          <span>
            Received on{" "}
            <span className="font-medium text-foreground">
              {format(
                new Date(message.createdAt),
                "dd MMM yyyy • hh:mm a"
              )}
            </span>
          </span>
        </div>
      </div>
    </FormModal>
  );
}