"use client";

import { BookingStep } from "@/types/booking.types";
import { ChevronLeft } from "lucide-react";


type Props = {
    step: BookingStep;
    onBack: () => void;
};

export default function BookingHeader({
    step,
    onBack,
}: Props) {
    const titles = {
        [BookingStep.DATE]: {
            title: "Choose a Date",
            subtitle: "Select a day for your lesson",
        },

        [BookingStep.SLOT]: {
            title: "Choose a Time",
            subtitle: "Pick an available slot",
        },

        [BookingStep.REVIEW]: {
            title: "Review Booking",
            subtitle: "Confirm your booking details",
        },

        [BookingStep.SUCCESS]: {
            title: "Booking Confirmed",
            subtitle: "Your lesson has been scheduled",
        },
    };

    const current = titles[step];

    return (
        <div className="border-b pb-5">

            <div className="flex items-center gap-3">

                {step !== BookingStep.DATE &&
                    step !== BookingStep.SUCCESS && (
                        <button
                            onClick={onBack}
                            className="
                            h-9 w-9 rounded-full border
                            hover:bg-muted transition
                            flex items-center
                            justify-center cursor-pointer"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )}

                <div>

                    <h2 className="text-xl font-semibold">
                        {current.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {current.subtitle}
                    </p>

                </div>

            </div>

        </div>
    );
}