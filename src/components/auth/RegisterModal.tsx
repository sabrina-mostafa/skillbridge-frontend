"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const FRONTEND_URL = env.NEXT_PUBLIC_FRONTEND_URL;

const registerSchema = z
    .object({
        name: z.string().min(3, "Name is too short"),
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Minimum 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


type RegisterModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openLogin: () => void;
};

export function RegisterModal({ open, setOpen, openLogin }: RegisterModalProps) {

    const router = useRouter();
    const pathname = usePathname();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    useEffect(() => {
        setOpen(false);
      }, [pathname, setOpen]);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validators: {
            onSubmit: registerSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                setIsRegisterLoading(true);

                const { error } = await authClient.signUp.email({
                    name: value.name,
                    email: value.email,
                    password: value.password,
                    callbackURL: `${FRONTEND_URL}/auth/callback`,
                });

                if (error) {
                    toast.error(error.message);
                    return;
                }

                toast.success("Registration successful. Please verify your email.");
                setOpen(false);

                router.push(`/verify-email?email=${value.email}`);
            } finally {
                setIsRegisterLoading(false);
            }
        },
    });

    const handleGoogleRegister = async () => {
        try {
            setIsGoogleLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: `${FRONTEND_URL}/auth/callback`,
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full cursor-pointer px-5 bg-indigo-600 hover:bg-indigo-700">
                    Register
                </Button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-120 max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0 bg-background
 [&>button]:top-4 [&>button]:right-4 [&>button]:h-10 [&>button]:w-10 [&>button]:rounded-full [&>button]:border
[&>button]:border-white/10 [&>button]:bg-white/10 dark:[&>button]:bg-black/20 [&>button]:backdrop-blur-md 
[&>button]:transition-all [&>button:hover]:scale-105 [&>button:hover]:bg-white/20 [&>button>svg]:h-5 [&>button>svg]:w-5"
            >
                {/* Top Gradient */}
                <div className="h-32 bg-linear-to-r from-indigo-600 via-violet-600 to-blue-600 relative">
                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute bottom-5 left-6 text-white">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-8 h-8" />
                            <span className="font-semibold text-lg">SkillBridge</span>
                        </div>

                        <p className="text-sm text-white/80 mt-1">
                            Start your learning journey today
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-6 pt-5">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold">
                            Create Account
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-3"
                    >
                        {/* NAME */}
                        <form.Field
                            name="name"
                            validators={{
                                onChange: registerSchema.shape.name,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Full Name
                                    </label>

                                    <Input
                                        placeholder="John Doe"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className=" h-9 mt-1 rounded-xl border-border/80 dark:border-border/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                                    />

                                    {field.state.meta.errors.length ? (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    ) : null}
                                </div>
                            )}
                        </form.Field>

                        {/* EMAIL */}
                        <form.Field
                            name="email"
                            validators={{
                                onChange: registerSchema.shape.email,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Email Address</label>

                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className=" h-9 mt-1 rounded-xl border-border/80 dark:border-border/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                                    />

                                    {field.state.meta.errors.length ? (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    ) : null}
                                </div>
                            )}
                        </form.Field>

                        {/* PASS */}
                        <div className="flex gap-4 md:flex-row flex-col">
                            {/* PASSWORD */}
                            <form.Field
                                name="password"
                                validators={{
                                    onChange: registerSchema.shape.password,
                                }}
                            >
                                {(field) => (
                                    <div className="space-y-1 w-full md:w-1/2">
                                        <label className="text-sm font-medium">Password</label>

                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className=" h-9 mt-1 rounded-xl border-border/80 dark:border-border/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4 cursor-pointer" />
                                                ) : (
                                                    <Eye className="w-4 h-4 cursor-pointer" />
                                                )}
                                            </button>
                                        </div>

                                        {field.state.meta.errors.length ? (
                                            <p className="text-sm text-red-500">
                                                {field.state.meta.errors[0]?.message}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </form.Field>

                            {/* CONFIRM PASSWORD */}
                            <form.Field name="confirmPassword">
                                {(field) => (
                                    <div className="space-y-1 w-full md:w-1/2">
                                        <label className="text-sm font-medium">
                                            Confirm Password
                                        </label>

                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className=" h-9 mt-1 rounded-xl border-border/80 dark:border-border/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-4 h-4 cursor-pointer" />
                                                ) : (
                                                    <Eye className="w-4 h-4 cursor-pointer" />
                                                )}
                                            </button>
                                        </div>

                                        {field.state.meta.errors.length ? (
                                            <p className="text-sm text-red-500">
                                                {field.state.meta.errors[0]?.message}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* SUBMIT */}
                        <Button
                            type="submit"
                            disabled={isRegisterLoading}
                            className="w-full cursor-pointer h-11 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isRegisterLoading ? "Registering..." : "Register"}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-3 text-muted-foreground text-[11px] tracking-wider">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* Google Button */}
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isGoogleLoading}
                            onClick={handleGoogleRegister}
                            className="h-11 w-full rounded-xl border-border/80 bg-background hover:bg-muted/50 transition-all duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer"
                        >
                            {isGoogleLoading ? (
                                <>
                                    <svg
                                        className="mr-2 h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        className="mr-3 h-5 w-5"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.29 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.29 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24 44c5.188 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.152 35.091 26.676 36 24 36c-5.202 0-9.619-3.329-11.283-7.946l-6.522 5.025C9.504 39.556 16.227 44 24 44z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.611 20.083H42V20H24v8h11.303c-.793 2.245-2.279 4.157-4.284 5.57l.003-.002l6.19 5.238C36.774 38.48 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={openLogin}
                                className="text-indigo-600 cursor-pointer hover:underline font-medium"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
