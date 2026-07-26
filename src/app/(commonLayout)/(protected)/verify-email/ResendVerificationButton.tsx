"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { userClientService } from "@/services/user/user.client.service";

const COOLDOWN_SECONDS = 60;

export default function ResendVerificationButton({
    email,
}: {
    email?: string;
}) {
    const [loading, setLoading] = useState(false);
    const [coolDown, setCoolDown] = useState(0);

    const handleResend = async () => {
        if (!email) {
            toast.error("Email is missing");
            return;
        }

        if (coolDown > 0) return;

        try {
            setLoading(true);

            await userClientService.resendVerificationEmail({ email });

            toast.success("Verification email sent!");

            setCoolDown(COOLDOWN_SECONDS);

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (coolDown <= 0) return;

        const timer = setInterval(() => {
            setCoolDown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [coolDown]);

    const isDisabled = loading || coolDown > 0;

    return (
        <Button
            variant="outline"
            className="w-full font-bold text-gray-700"
            onClick={handleResend}
            disabled={isDisabled}
        >
            {loading
                ? "Sending..."
                : coolDown > 0
                    ? `Resend available in ${coolDown}s`
                    : "Resend Verification Email"}
        </Button>
    );
}