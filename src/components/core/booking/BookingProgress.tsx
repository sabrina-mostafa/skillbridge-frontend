"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    "Choose Date",
    "Choose Time",
    "Review",
];

type Props = {
    currentStep: number;
};

export default function BookingProgress({
    currentStep,
}: Props) {
    return (
        <div className="mb-8">
            <div className="flex items-center">

                {steps.map((step, index) => {

                    const stepNumber = index + 1;

                    const completed =
                        stepNumber < currentStep;

                    const active =
                        stepNumber === currentStep;

                    return (
                        <div
                            key={step}
                            className="flex items-center flex-1"
                        >
                            {/* Circle */}

                            <div
                                className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",

                                    completed &&
                                    "border-primary bg-primary text-white",

                                    active &&
                                    "border-primary text-primary",

                                    !completed &&
                                    !active &&
                                    "border-muted text-muted-foreground"
                                )}
                            >
                                {completed ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    stepNumber
                                )}
                            </div>

                            {/* Title */}

                            <div className="ml-3">
                                <p
                                    className={cn(
                                        "text-sm font-medium",

                                        active &&
                                        "text-primary",

                                        !active &&
                                        "text-muted-foreground"
                                    )}
                                >
                                    {step}
                                </p>
                            </div>

                            {index !== steps.length - 1 && (
                                <div className="mx-5 h-[2px] flex-1 bg-border" />
                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
}