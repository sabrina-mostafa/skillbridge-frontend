"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import {
    InputGroup,
    InputGroupTextarea,
} from "@/components/ui/input-group";

import {
    BookOpen,
    ArrowRight,
} from "lucide-react";
import { CategoryBase } from "@/types/category.type";
import { tutorClientService } from "@/services/tutor/tutor.client.service";

const tutorSchema = z.object({
    bio: z
        .string()
        .min(20, "Bio must be at least 20 characters"),

    education: z
        .string()
        .min(2, "Education is required"),

    experience: z
        .string()
        .min(1, "Experience is required"),

    hourlyRate: z
        .number()
        .min(1, "Hourly rate must be greater than 0"),

    categories: z
        .array(z.string())
        .min(1, "Select at least one category"),
});

export default function TutorOnboardingPage({ categories }: { categories: CategoryBase[] }) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            bio: "",
            education: "",
            experience: "",
            hourlyRate: 0,
            categories: [] as string[],
        },

        validators: {
            onSubmit: tutorSchema,
        },

        onSubmit: async ({ value }) => {
            const toastId =
                toast.loading("Creating tutor profile...");

            try {
                const result = await tutorClientService.createProfile(value);

                if (result.error) {
                    console.error("Create tutor profile error:", result.error);

                    toast.error(
                        result.error.message ??
                        "Failed to create profile", { id: toastId, }
                    );
                    return;
                }

                toast.success(
                    "Tutor profile created successfully", { id: toastId, }
                );

                router.push(`/user`);
            } catch (error) {
                toast.error(
                    "Something went wrong", { id: toastId, }
                );
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
                        Complete Your Tutor Profile
                    </h1>

                    <p className="mt-4 text-muted-foreground text-lg">
                        Tell students about your expertise,
                        experience, and the subjects you
                        teach.
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
                                            <FieldLabel>
                                                About Yourself
                                            </FieldLabel>

                                            <InputGroup>
                                                <InputGroupTextarea
                                                    placeholder="Tell students about your teaching style, expertise and background..."
                                                    className="min-h-32"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </InputGroup>

                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }
                                            />
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
                                            <FieldLabel>
                                                Education
                                            </FieldLabel>

                                            <Input
                                                placeholder="B.Sc in Mathematics"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* EXPERIENCE */}
                            <form.Field name="experience">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>
                                                Teaching Experience
                                            </FieldLabel>

                                            <Input
                                                placeholder="7 years"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* HOURLY RATE */}
                            <form.Field name="hourlyRate">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>
                                                Hourly Rate (BDT)
                                            </FieldLabel>

                                            <Input
                                                type="number"
                                                placeholder="2499"
                                                value={
                                                    field.state.value || ""
                                                }
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />

                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* CATEGORIES */}
                            <form.Field name="categories">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>
                                                Subjects You Teach
                                            </FieldLabel>

                                            <div className="flex flex-wrap gap-3">
                                                {categories.map((category) => {
                                                    const selected = field.state.value.includes(category.id);

                                                    return (
                                                        <button
                                                            key={category.id}
                                                            type="button"
                                                            onClick={() => {
                                                                if (selected) {
                                                                    field.handleChange(
                                                                        field.state.value.filter((id) => id !== category.id)
                                                                    );
                                                                } else {
                                                                    field.handleChange(
                                                                        [
                                                                            ...field.state.value,
                                                                            category.id,
                                                                        ]
                                                                    );
                                                                }
                                                            }}
                                                            className={`
                                                                    px-4 py-2 rounded-full border transition
                                                                    ${selected
                                                                    ? "bg-primary text-white border-primary"
                                                                    : "bg-card hover:border-primary"
                                                                }
                                                                `}
                                                        >
                                                            {
                                                                category.name
                                                            }
                                                        </button>
                                                    );
                                                }
                                                )}
                                            </div>

                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* SUBMIT */}
                            <form.Subscribe
                                selector={(state) => [
                                    state.canSubmit,
                                    state.isSubmitting,
                                ]}
                            >
                                {([
                                    canSubmit,
                                    isSubmitting,
                                ]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="w-full cursor-pointer font-bold h-12 rounded-xl mt-4"
                                    >
                                        <BookOpen className="w-4 h-4 mr-2" />

                                        {isSubmitting
                                            ? "Creating Profile..."
                                            : "Complete Profile"}

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