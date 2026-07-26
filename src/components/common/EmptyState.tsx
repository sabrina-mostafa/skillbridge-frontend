import { ReactNode } from "react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
};

export default function EmptyState({
    title,
    description,
    icon,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-12 text-center",
                className
            )}
        >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                {icon ?? (
                    <Inbox className="h-8 w-8 text-muted-foreground" />
                )}
            </div>

            <h3 className="text-xl font-semibold">{title}</h3>

            {description && (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}