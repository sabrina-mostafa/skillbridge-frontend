"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewStarPickerProps = {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
};

const labels = [
    "",
    "Very Poor",
    "Poor",
    "Average",
    "Good",
    "Excellent",
];

export default function ReviewStarPicker({
    value,
    onChange,
    disabled = false,
}: ReviewStarPickerProps) {
    const [hoverValue, setHoverValue] = useState(0);

    const currentValue = hoverValue || value;

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                    const active = star <= currentValue;

                    return (
                        <button
                            key={star}
                            type="button"
                            disabled={disabled}
                            onClick={() => onChange(star)}
                            onMouseEnter={() =>
                                setHoverValue(star)
                            }
                            onMouseLeave={() =>
                                setHoverValue(0)
                            }
                            className={cn(
                                "transition-all duration-200",
                                !disabled &&
                                    "cursor-pointer hover:scale-110 active:scale-95",
                                disabled &&
                                    "cursor-not-allowed opacity-60"
                            )}
                        >
                            <Star
                                className={cn(
                                    "h-8 w-8 transition-colors",

                                    active
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            <p className="text-sm text-muted-foreground min-h-5">
                {labels[currentValue]}
            </p>
        </div>
    );
}