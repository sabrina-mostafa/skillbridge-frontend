"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PublicContactMessages } from "@/types/public-contact-form.type";
import InboxActionsDropdown from "./InboxActionsDropdown";

type Props = {
  messages: PublicContactMessages[];
  onView: (message: PublicContactMessages) => void;
  onDelete: (message: PublicContactMessages) => void;
};

export default function InboxTable({
  messages,
  onView,
  onDelete,
}: Props) {
  const getMessagePreview = (message: string) => {
    const words = message.trim().split(/\s+/);

    return words.length <= 6
      ? message
      : `${words.slice(0, 6).join(" ")}...`;
  };

  return (
    <div className="overflow-hidden rounded-2xl p-2 border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Inquiry Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Received</TableHead>
            <TableHead className="w-20 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-16 text-center text-muted-foreground"
              >
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            messages.map((message) => (
              <TableRow
                key={message.id}
                className="transition-colors hover:bg-muted/40"
              >
                {/* Sender */}
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {message.fullName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>

                    {message.phone && (
                      <p className="text-xs text-muted-foreground">
                        {message.phone}
                      </p>
                    )}
                  </div>
                </TableCell>

                {/* User Type */}
                <TableCell className="align-top">
                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {message.userType}
                  </span>
                </TableCell>

                {/* Inquiry Type */}
                <TableCell className="align-top">
                  <div className="flex max-w-xs flex-wrap gap-1.5">
                    {message.inquiryType
                      .slice(0, 2)
                      .map((item) => (
                        <span
                          key={item}
                          className="rounded-md border bg-muted px-2 py-1 text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}

                    {message.inquiryType.length > 2 && (
                      <span className="rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">
                        +{message.inquiryType.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Message */}
                <TableCell className="align-top">
                  <div className="max-w-sm space-y-1">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {getMessagePreview(message.message)}
                    </p>

                    {message.message.trim().split(/\s+/).length >
                      6 && (
                      <button
                        type="button"
                        onClick={() => onView(message)}
                        className="cursor-pointer text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                      >
                        View full message
                      </button>
                    )}
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="whitespace-nowrap align-top text-sm text-muted-foreground">
                  {format(
                    new Date(message.createdAt),
                    "dd MMM yyyy"
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="align-top text-right">
                  <InboxActionsDropdown
                    message={message}
                    onView={() => onView(message)}
                    onDelete={() => onDelete(message)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}