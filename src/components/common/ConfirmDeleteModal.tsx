"use client";

import FormModal from "@/components/common/FormModal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { ReactNode } from "react";

type ConfirmDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export default function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  children,
}: ConfirmDeleteModalProps) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="sm"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-sm leading-6 text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {children}

        {/* Actions */}
        <div className="flex w-full gap-3 border-t pt-4">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClick={onConfirm}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />

            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </FormModal>
  );
}