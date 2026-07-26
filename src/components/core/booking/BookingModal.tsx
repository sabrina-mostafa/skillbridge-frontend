"use client";

import { useState } from "react";

import FormModal from "@/components/common/FormModal";

import BookingProgress from "./BookingProgress";
import BookingDateStep from "./BookingDateStep";
import BookingSlotStep from "./BookingSlotStep";
import { Tutor } from "@/types/tutor.types";
import BookingConfirmStep from "./BookingConfirmStep";
import { TimeSlot } from "@/types/availability.type";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    tutor: Tutor;
};

export default function BookingModal({
    open,
    onOpenChange,
    tutor,
}: Props) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const reset = () => {
        setStep(1);
        setSelectedDate("");
        setSelectedSlot(null);
    };

    const handleClose = (
        value: boolean
    ) => {
        onOpenChange(value);
        if (!value) {
            reset();
        }
    };


    return (
        <FormModal
            open={open}
            onOpenChange={handleClose}
            title="Book Session"
            size="lg"
        >
            <BookingProgress
                currentStep={step}
            />

            {step === 1 && (
                <BookingDateStep
                    tutorId={tutor.id}
                    selectedDate={selectedDate}
                    onNext={(date) => {
                        setSelectedDate(date);
                        setStep(2);
                    }}
                />
            )}

            {step === 2 && (
                <BookingSlotStep
                    tutorId={tutor.id}
                    selectedDate={selectedDate}
                    onBack={() => setStep(1)}
                    onNext={(slot) => {
                        setSelectedSlot(slot);
                        setStep(3);
                    }}
                />
            )}

            {step === 3 && selectedSlot && (
                <BookingConfirmStep
                    tutor={tutor}
                    date={selectedDate}
                    slot={selectedSlot}
                    onBack={() => setStep(2)}
                    onSuccess={() => {
                        handleClose(false);
                    }}
                />
            )}


        </FormModal>

    );

}