"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordForm() {
    const [sent, setSent] = React.useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
        },

        validators: {
            onSubmit: forgotPasswordSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const { error } = await authClient.requestPasswordReset({
                    email: value.email,
                    redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password`,
                });

                if (error) {
                    toast.error(error.message);
                    return;
                }

                setSent(true);
                toast.success("Reset link sent to your email");
            } catch {
                toast.error("Something went wrong");
            }
        },
    });

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 px-4">

            <div className="w-full max-w-125 rounded-3xl border bg-background shadow-xl overflow-hidden">

                {/* HEADER (same as verify email page) */}
                <div className="h-30 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="h-20 w-20 rounded-full bg-background shadow-lg flex items-center justify-center border">
                            <Mail className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="px-8 pt-16 pb-8 text-center">

                    {!sent ? (
                        <>
                            <h1 className="text-3xl font-bold">
                                Forgot your password?
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                No worries. Enter your email and we’ll send you a reset link.
                            </p>

                            {/* FORM */}
                            <form
                                id="forgot-password-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit();
                                }}
                            >
                                <FieldGroup>
                                    <div className="mt-6 text-left">
                                        <form.Field name="email">
                                            {(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched &&
                                                    !field.state.meta.isValid;

                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel>Email address</FieldLabel>

                                                        <Input
                                                            className="mt-2 h-9"
                                                            placeholder="you@example.com"
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) =>
                                                                field.handleChange(e.target.value)
                                                            }
                                                            aria-invalid={isInvalid}
                                                        />

                                                        {isInvalid && (
                                                            <FieldError errors={field.state.meta.errors} />
                                                        )}
                                                    </Field>
                                                );
                                            }}
                                        </form.Field>
                                    </div>
                                </FieldGroup>
                            </form>

                            {/* ACTIONS */}
                            <Button
                                type="submit"
                                form="forgot-password-form"
                                className="w-full h-9 mt-5 hover:bg-indigo-500 font-bold cursor-pointer"
                            >
                                Send reset link
                            </Button>

                            <p className="mt-5 text-sm text-muted-foreground">
                                Remember your password?{" "}
                                <Link href="/" className="text-primary font-medium hover:underline">
                                    Back to login
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            {/* SUCCESS STATE (MATCHING VERIFY EMAIL UX) */}
                            <h1 className="text-3xl font-bold">
                                Check your email
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                We’ve sent a password reset link to
                            </p>

                            {/* EMAIL BOX */}
                            <div className="mt-3 rounded-xl border bg-muted/40 px-4 py-2">
                                <p className="font-semibold text-primary break-all">
                                    {form.getFieldValue("email")}
                                </p>
                            </div>

                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                Please check your inbox and spam folder. Click the link to reset your password.
                            </p>

                            {/* ACTIONS */}
                            <div className="mt-4 flex flex-col gap-3">
                                <Button asChild className="w-full font-bold">
                                    <Link href="/">
                                        Back to Login
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => setSent(false)}
                                    className="w-full border border-primary cursor-pointer"
                                >
                                    Try another email
                                </Button>
                            </div>

                            <p className="mt-5 text-xs text-muted-foreground">
                                Didn’t receive the email? Wait a minute and check spam folder.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}