"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ResetPasswordForm({
  token,
}: {
  token?: string;
}) {
  const router = useRouter();
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      password: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      if (!token) {
        toast.error("Invalid or missing reset token");
        return;
      }

      try {
        const { error } = await authClient.resetPassword({
          token,
          newPassword: value.password,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        setSuccess(true);
        toast.success("Password updated successfully");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">

      <div className="w-full max-w-130 rounded-3xl border bg-background shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="sm:h-30 h-25 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 relative">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="h-20 w-20 rounded-full bg-background shadow-lg flex items-center justify-center border">
              <Lock className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-16 pb-8 text-center">

          {!success ? (
            <>
              <h1 className="text-3xl font-bold">
                Reset your password
              </h1>

              <p className="mt-2 text-muted-foreground">
                Enter a new password for your account.
              </p>

              {/* FORM */}
              <form
                id="reset-password-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <div className="mt-6 text-left">
                    <form.Field name="password">
                      {(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;

                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel>New password</FieldLabel>

                            {/* INPUT WITH TOGGLE */}
                            <div className="relative mt-2">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="pr-10 h-9"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  setShowPassword((prev) => !prev)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>

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
                form="reset-password-form"
                className="w-full h-9 mt-5 hover:bg-indigo-500 font-bold cursor-pointer"
              >
                Update password
              </Button>

              <p className="mt-5 text-sm text-muted-foreground">
                Make sure your password is strong and secure.
              </p>
            </>
          ) : (
            <>
              {/* SUCCESS STATE */}
              <h1 className="text-3xl font-bold">
                Password updated
              </h1>

              <p className="mt-2 text-muted-foreground">
                Your password has been successfully reset.
              </p>

              <div className="mt-4 rounded-xl border bg-muted/40 px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  Redirecting you to login...
                </p>
              </div>

              <Button asChild className="w-full mt-6 font-bold">
                <Link href="/">
                  Go to login
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}