"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

import { studentClientService } from "@/services/student/student.client.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

import { GraduationCap, ArrowRight } from "lucide-react";
import { CategoryBase } from "@/types/category.type";


const studentSchema = z.object({
    bio: z.string().min(20, "Bio must be at least 20 characters"),
    education: z.string().min(2, "Education is required"),
    categories: z.array(z.string()).min(1, "Select at least one category"),
});

export default function StudentOnboardingPage({
    categories,
}: {
    categories: CategoryBase[];
}) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            bio: "",
            education: "",
            categories: [] as string[],
        },

        validators: {
            onSubmit: studentSchema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating profile...");

            try {
                const result = await studentClientService.createProfile(value);

                if (result.error) {
                    if (result.error) {
                        console.error("Create student profile error:", result.error);

                        toast.error(result.error.message ?? "Failed to create profile", {
                            id: toastId,
                        });
                        return;
                    }
                    return;
                }
                toast.success("Student profile created successfully", { id: toastId });

                router.push("/user");
            } catch (error) {
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    return (
        <section className="min-h-screen relative overflow-hidden">
            {/* GRID BG */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 60px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* BLOBS */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-400/20 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-400/20 blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-20">
                {/* HEADER */}
                <div className="text-center mt-8 mb-12">
                    <span className="inline-flex bg-indigo-100 dark:bg-gray-800 font-bold text-primary items-center rounded-full border px-4 py-1 text-sm mb-6">
                        Step 2 of 3
                    </span>

                    <h1 className="text-5xl font-bold tracking-tight">
                        Complete Your Student Profile
                    </h1>

                    <p className="mt-4 text-muted-foreground text-lg">
                        Tell us a little about yourself so we can personalize your learning
                        experience.
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="border dark:border-primary bg-card rounded-3xl p-8 shadow-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            {/* BIO */}
                            <form.Field name="bio">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>About Yourself</FieldLabel>

                                            <InputGroup>
                                                <InputGroupTextarea
                                                    placeholder="Tell us about your learning goals..."
                                                    className="min-h-32"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            </InputGroup>

                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* EDUCATION */}
                            <form.Field name="education">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Education</FieldLabel>

                                            <Input
                                                placeholder="B.Sc in CSE"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />

                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* CATEGORIES */}
                            <form.Field name="categories">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Learning Interests</FieldLabel>

                                            <div className="flex flex-wrap gap-3">
                                                {categories.map((category) => {
                                                    const selected = field.state.value.includes(
                                                        category.id,
                                                    );

                                                    return (
                                                        <button
                                                            key={category.id}
                                                            type="button"
                                                            onClick={() => {
                                                                if (selected) {
                                                                    field.handleChange(
                                                                        field.state.value.filter(
                                                                            (id) => id !== category.id,
                                                                        ),
                                                                    );
                                                                } else {
                                                                    field.handleChange([
                                                                        ...field.state.value,
                                                                        category.id,
                                                                    ]);
                                                                }
                                                            }}
                                                            className={`
                                    px-4 py-2 rounded-full border transition cursor-pointer
                                    ${selected
                                                                    ? "bg-primary text-white border-primary"
                                                                    : "bg-card hover:border-primary"
                                                                }
                                  `}
                                                        >
                                                            {category.name}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* SUBMIT */}
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="w-full cursor-pointer font-bold h-12 rounded-xl mt-4"
                                    >
                                        <GraduationCap className="w-4 h-4 mr-2" />

                                        {isSubmitting ? "Creating Profile..." : "Complete Profile"}

                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </form.Subscribe>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </section>
    );
}
