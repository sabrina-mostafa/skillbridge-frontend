import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TableHeaderSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function TableHeaderSection({
  title,
  description,
  action,
  className,
}: TableHeaderSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="space-y-1 pb-2">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}