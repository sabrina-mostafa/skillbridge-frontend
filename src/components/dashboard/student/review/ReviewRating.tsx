"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewRatingProps = {
    rating: number;
    onChange?: (rating: number) => void;
    readonly?: boolean;
    size?: number;
    showValue?: boolean;
    showLabel?: boolean;
    className?: string;
};

export default function ReviewRating({
    rating,
    onChange,
    readonly = false,
    size = 22,
    showValue = false,
    className,
}: ReviewRatingProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;

                    return (
                        <button
                            key={value}
                            type="button"
                            disabled={readonly}
                            onClick={() => onChange?.(value)}
                            className={cn(
                                "transition-transform",
                                !readonly && "cursor-pointer hover:scale-110"
                            )}
                        >
                            <Star
                                size={size}
                                className={cn(
                                    "transition-colors",
                                    value <= rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            {showValue && (
                <span className="text-sm font-medium">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}