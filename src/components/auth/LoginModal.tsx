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
import { toast } from "sonner";
import { env } from "@/env";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";


const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters"),
});

const inputStyles =
  "h-9 mt-2 rounded-xl border-border/80 dark:border-border/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30";

const FRONTEND_URL = env.NEXT_PUBLIC_FRONTEND_URL;

type LoginModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openRegister: () => void;
};

export function LoginModal({ open, setOpen, openRegister, }: LoginModalProps) {

  const router = useRouter();
  const pathname = usePathname();

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);


  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        setIsLoginLoading(true);

        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: `${FRONTEND_URL}/auth/callback`,
        });

        if (error) {

          if (error?.code === "EMAIL_NOT_VERIFIED") {
            setOpen(false);
            console.log("EMAIL_NOT_VERIFIED``````````````")
            router.push(`/verify-email?email=${value.email}`);
            // router.push(`${FRONTEND_URL}/auth/callback`);
            return;
          }

          toast.error(
            "Invalid email or password. If you don't have an account, please register first."
          );
          return;
        }
        toast.success("Welcome back!");
        setOpen(false);

        // router.push(`/user`);

      } finally {
        setIsLoginLoading(false);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: `/auth/callback`,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full cursor-pointer border border-gray-200 dark:border-gray-700 px-5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
        >
          Login
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[480px] rounded-2xl border-0 p-0 overflow-hidden bg-background
          [&>button]:top-4 [&>button]:right-4 [&>button]:h-10 [&>button]:w-10 [&>button]:rounded-full [&>button]:border  [&>button]:border-white/10  [&>button]:bg-white/10 dark:[&>button]:bg-black/20 [&>button]:backdrop-blur-md [&>button]:transition-all [&>button:hover]:scale-105 [&>button:hover]:bg-white/20 [&>button>svg]:h-5 [&>button>svg]:w-5"
      >
        {/* Top Gradient */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 relative">
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-5 left-6 text-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8" />
              <span className="font-semibold text-lg">SkillBridge</span>
            </div>

            <p className="text-sm text-white/80 mt-1">
              Welcome back to your learning journey
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 pt-5">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold">
              Login to Account
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* EMAIL */}
            <form.Field
              name="email"
              validators={{
                onChange: loginSchema.shape.email,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={inputStyles}
                  />

                  {field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field
              name="password"
              validators={{
                onChange: loginSchema.shape.password,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs cursor-pointer text-indigo-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`${inputStyles} pr-10`}
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


            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isLoginLoading}
              className="w-full h-11 mt-2 cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoginLoading ? "Signing In..." : "Login"}
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
              onClick={handleGoogleLogin}
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
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={openRegister}
                className="text-indigo-600 cursor-pointer hover:underline font-medium"
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog >
  );
}