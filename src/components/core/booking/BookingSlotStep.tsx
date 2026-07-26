"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { TimeSlot } from "@/types/availability.type";
import { cn } from "@/lib/utils";

type Props = {
    tutorId: string;
    selectedDate: string;
    onBack: () => void;
    onNext: (slot: TimeSlot) => void;
};

export default function BookingSlotStep({
    tutorId,
    selectedDate,
    onBack,
    onNext,
}: Props) {

    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSlots = async () => {
            setLoading(true);

            const res =
                await bookingClientService.getAvailableSlots(
                    tutorId,
                    selectedDate
                );
            console.log("slots res:", res);

            if (!res.error && res.data) {
                setSlots(res.data.slots);
            }
            setLoading(false);
        };
        fetchSlots();

    }, [tutorId, selectedDate]);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    return (

        <div className="space-y-6">

            {/* Header */}
            <div>
                <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={onBack}
                    className="rounded-xl mb-6 px-5 h-10 cursor-pointer"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <h2 className="text-xl font-semibold">
                    Select a Time
                </h2>
                <p className="text-muted-foreground mt-1">

                    {new Date(selectedDate).toLocaleDateString(
                        undefined,
                        {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }
                    )}
                </p>
            </div>

            {/* Slots */}
            {!slots.length ? (
                <div className="border rounded-xl p-8 text-center text-muted-foreground">
                    No slots available.
                </div>

            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {slots.map((slot) => (
                        <button
                            key={slot.start}
                            onClick={() => onNext(slot)}
                            className={cn(
                                "group rounded-2xl border p-3 transition-all",
                                "hover:border-primary",
                                "hover:bg-primary/5",
                                "hover:-translate-y-1",
                                "cursor-pointer"
                            )}
                        >
                            <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />

                            <div className="flex flex-wrap justify-center items-center gap-2">
                                <div
                                    className="text-center font-semibold"
                                >
                                    {new Date(slot.start)
                                        .toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })}
                                </div>

                                <div
                                    className="text-xs text-muted-foreground text-center"
                                >
                                    to
                                </div>

                                <div
                                    className="text-center text-sm text-muted-foreground"
                                >
                                    {new Date(slot.end)
                                        .toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })}

                                </div>
                            </div>
                        </button>

                    ))}

                </div>

            )}

        </div>

    );

}