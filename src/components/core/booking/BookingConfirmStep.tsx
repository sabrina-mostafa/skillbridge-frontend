"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Calendar,
    Clock,
    BookOpen,
    ArrowLeft,
    Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tutor } from "@/types/tutor.types";
import { TimeSlot } from "@/types/availability.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { bookingClientService } from "@/services/booking/booking.client.service";
import { cn } from "@/lib/utils";


type Props = {
    tutor: Tutor;
    date: string;
    slot: TimeSlot;
    onBack: () => void;
    onSuccess: () => void;
};

const schema = z.object({
    categoryId: z.string().min(1, "Please select a subject"),
});


export default function BookingConfirmStep({
    tutor,
    date,
    slot,
    onBack,
    onSuccess,
}: Props) {
    const router = useRouter();

    const duration = useMemo(() => {
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        return (end.getTime() - start.getTime()) / 1000 / 60;

    }, [slot]);

    const total = useMemo(() => {
        return (
            ((Number(tutor.hourlyRate) ?? 0) * duration) / 60
        );

    }, [duration, tutor.hourlyRate]);

    const form = useForm({
        defaultValues: {
            categoryId: "",
        },
        validators: {
            onSubmit: schema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating booking...");

            const result =
                await bookingClientService.createBooking({
                    tutorId: tutor.id,
                    categoryId: value.categoryId,
                    date,
                    startTime: slot.start,
                    endTime: slot.end,
                });

            if (result.error) {
                toast.error(result.error.message, {
                    id: toastId,
                });
                return;
            }
            toast.success("Booking created successfully!", { id: toastId });

            onSuccess();
            router.refresh();
        },

    });


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-8"
        >
            <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={onBack}
                className="rounded-xl px-5 h-10 cursor-pointer"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-5 shadow-sm">
                <div className="flex gap-4">
                    <Image
                        src={
                            tutor.user?.image ||
                            "/default-avatar.png"
                        }
                        alt={tutor.user?.name}
                        width={70}
                        height={70}
                        className="rounded-xl object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-lg">
                            {tutor.user?.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {tutor.education}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 space-y-5 shadow-sm">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Date
                    </div>

                    <span>
                        {new Date(
                            date
                        ).toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Time
                    </div>

                    <span>
                        {new Date(
                            slot.start
                        ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: "UTC",
                        })}

                        {" - "}

                        {new Date(
                            slot.end
                        ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: "UTC",
                        })}
                    </span>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Total
                    </div>

                    <span>
                        ৳{total.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="rounded-2xl border bg-card/60 backdrop-blur-sm px-6 py-4 space-y-5 shadow-sm">
                <form.Field name="categoryId">
                    {(field) => (
                        <div className="space-y-3 w-full">
                            <label className="text-sm font-semibold text-foreground">
                                Subject
                            </label>

                            <Select
                                value={field.state.value}
                                onValueChange={field.handleChange}
                            >
                                <SelectTrigger
                                    className={cn(
                                        "w-full h-12 rounded-xl mt-1 cursor-pointer",
                                        "border-border/60",
                                        "bg-background",
                                        "hover:border-primary/40",
                                        "focus:ring-2 focus:ring-primary/20",
                                        field.state.meta.errors.length > 0 &&
                                        "border-destructive focus:ring-destructive/20"
                                    )}
                                >
                                    <SelectValue placeholder="Choose a subject" />
                                </SelectTrigger>

                                <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-xl">
                                    {tutor.categories?.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                            className="px-5 py-2 cursor-pointer"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {field.state.meta.errors.length > 0 && (
                                <p className="text-sm text-destructive">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full h-13 rounded-xl text-base font-semibold shadow-lg cursor-pointer"
            >
                <BookOpen className="mr-2 h-5 w-5" />
                Confirm Booking
            </Button>

        </form>

    );

}