"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { uploadService } from "@/services/upload/upload.service";
import { userClientService } from "@/services/user/user.client.service";
import { CategoryBase } from "@/types/category.type";
import { Student } from "@/types/student.type";
import { studentClientService } from "@/services/student/student.client.service";
import { User } from "@/types/user.type";
import { Tutor } from "@/types/tutor.types";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { tutorClientService } from "@/services/tutor/tutor.client.service";
import { settingsSchema } from "@/schemas/profileSettingSchema";
import { useForm } from "@tanstack/react-form";
import { createSlug } from "@/helpers/create-slug";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BriefcaseBusiness, Camera, Tags, User as UserIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/common/UserAvatar";


type ProfileSettingsClientProps = {
    user: User;
    profile: Student | Tutor;
    categories: CategoryBase[];
};

export default function ProfileSettingsClient({ user, profile, categories: availableCategories }: ProfileSettingsClientProps) {
    const router = useRouter();

    const tutorProfile = user.role === USER_ROLES.TUTOR ? (profile as Tutor) : null;

    const form = useForm({
        defaultValues: {
            bio: profile.bio ?? "",
            education: profile.education ?? "",
            categories: profile.categories?.map((c) => c.id) ?? [],
            experience: tutorProfile?.experience ?? "",
            hourlyRate: Number(tutorProfile?.hourlyRate || 1),
        },
        validators: {
            onSubmit: settingsSchema,
        },
        onSubmit: async ({ value }) => {

            try {
                let result;

                if (user.role === USER_ROLES.STUDENT) {
                    result = await studentClientService.updateProfile(profile.id, {
                        bio: value.bio,
                        education: value.education,
                        categories: value.categories,
                    });
                } else {
                    result = await tutorClientService.updateProfile(profile.id, {
                        bio: value.bio,
                        education: value.education,
                        experience: value.experience,
                        hourlyRate: Number(value.hourlyRate),
                        categories: value.categories,
                    });
                }

                if (result.error) {
                    throw result.error;
                }

                toast.success("Profile updated successfully");
                router.refresh();
                router.push(`/user/${createSlug(user.name)}/profile`);
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to update profile"
                );
            }
        },
    });


    const [image, setImage] = useState(user.image ?? "");
    const [uploading, setUploading] = useState(false);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // validate type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image");
            return;
        }

        // validate size
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be under 5 MB");
            return;
        }

        try {
            setUploading(true);

            // Upload to Cloudinary
            const uploadResult = await uploadService.uploadImage(file);

            // Save URL in DB
            const result = await userClientService.updateProfileImage({
                image: uploadResult.secure_url,
            });

            if (result.error) {
                throw result.error;
            }

            // Update local UI
            setImage(uploadResult.secure_url);

            toast.success("Profile picture updated!");

            // refresh server components
            router.refresh();

        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to upload image",
            );
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="relative min-h-screen overflow-hidden pt-32 pb-16 px-6">
            {/* GRID */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right,#6366f1 1px,transparent 60px),linear-gradient(to bottom,#6366f1 1px,transparent 30px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* BLOBS */}
            <div className="absolute inset-0 pointer-events-none">

                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[120px]" />

                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-400/20 blur-[120px]" />

                <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-[100px]" />

            </div>

            <div className="relative max-w-5xl mx-auto space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>

                    <p className="text-muted-foreground mt-1">
                        Manage your identity and learning preferences.
                    </p>
                </div>


                <div className="space-y-8">
                    <div className="grid gap-8 lg:grid-cols-3">

                        <div>
                            {/* AVATAR */}
                            <SettingsCard
                                title="Profile Photo"
                                description="Upload a professional profile picture."
                            >
                                <div className="flex flex-col items-center gap-5">
                                    <div className="relative">
                                        <UserAvatar
                                            name={user.name}
                                            image={user.image}
                                            className="relative w-32 h-32 sm:text-4xl text-3xl rounded-full bg-gradient-to-br from-indigo-700 to-violet-400 border border-transparent"
                                        />

                                        <label
                                            className="absolute bottom-1 right-1 h-10 w-10 rounded-full bg-primary flex items-center justify-center cursor-pointer  text-white hover:scale-105 transition"
                                        >
                                            <Camera className="size-5" />
                                            <Input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                            />
                                        </label>
                                    </div>

                                    <p className="text-sm text-muted-foreground">JPG or PNG · Max 5MB</p>
                                </div>
                            </SettingsCard>
                        </div>

                        <div className="lg:col-span-2 shadow-lg hover:shadow-md transition-all p-6 bg-white dark:bg-gray-800/70 rounded-4xl sm:rounded-xl border border-primary/20">
                            {/* Profile Information */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit();
                                }}
                            >
                                <FieldGroup>

                                    {/* USER INFO */}
                                    <div className="border border-primary/20 rounded-xl p-6 space-y-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="size-5 text-primary" />
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-semibold">Profile Information</h2>
                                                {/* <p className="text-sm text-muted-foreground">Tell others about yourself.</p> */}
                                            </div>
                                        </div>


                                        <div>
                                            {/* Bio */}
                                            <form.Field name="bio">
                                                {(field) => (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Bio</label>
                                                        <Textarea
                                                            rows={5}
                                                            placeholder="Shortly tell about yourself..."
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="w-full mt-1 h-25 text-gray-500 dark:text-gray-400/90 rounded-xl border border-primary/20 px-4 py-3 resize-none"
                                                        />
                                                        {field.state.meta.errors.length > 0 && (
                                                            <p className="text-sm text-red-500">
                                                                {field.state.meta.errors[0]?.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </form.Field>

                                        </div>

                                        <div>
                                            {/* Education */}
                                            <form.Field name="education">
                                                {(field) => (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Education</label>
                                                        <Input
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="w-full h-10 text-gray-500 dark:text-gray-400/90 mt-1 rounded-xl border border-primary/20 px-4 py-3"
                                                        />
                                                    </div>
                                                )}
                                            </form.Field>

                                        </div>
                                    </div>

                                    {/* TUTOR ROLE SPECIFIC SECTION */}
                                    {user.role === USER_ROLES.TUTOR && (
                                        <div className="border border-primary/20 p-6 rounded-xl space-y-5">

                                            <h2 className="flex items-center gap-2 text-xl font-semibold">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <BriefcaseBusiness className="size-5 text-primary" />
                                                </div>
                                                Tutor Information
                                            </h2>

                                            {/* EXPERIENCE */}
                                            <div>
                                                <form.Field name="experience">
                                                    {(field) => (
                                                        <div>
                                                            <label className="text-sm font-medium">Experience</label>
                                                            <Textarea
                                                                rows={5}
                                                                value={field.state.value}
                                                                onBlur={field.handleBlur}
                                                                onChange={(e) => field.handleChange(e.target.value)}
                                                                className="w-full mt-1 text-gray-500 dark:text-gray-400/90 h-12 rounded-xl border p-3"
                                                            />
                                                        </div>
                                                    )}
                                                </form.Field>

                                            </div>

                                            {/* HOURLY RATE */}
                                            <div>
                                                <form.Field name="hourlyRate">
                                                    {(field) => (
                                                        <div>
                                                            <label className="text-sm font-medium">Hourly Rate</label>
                                                            <Input
                                                                className="mt-1 h-10 text-gray-500 dark:text-gray-400/90"
                                                                type="number"
                                                                value={field.state.value}
                                                                onBlur={field.handleBlur}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;

                                                                    field.handleChange(
                                                                        value === "" ? 0 : Number(value)
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </form.Field>

                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                These details will be shown to students when they browse tutors.
                                            </p>

                                        </div>
                                    )}

                                    {/* CATEGORIES */}
                                    <div className="border border-primary/20 rounded-xl p-6">
                                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <Tags className="size-5 text-primary" />
                                            </div>
                                            Categories
                                        </h2>

                                        <form.Field name="categories">
                                            {(field) => (
                                                <div className="flex flex-wrap gap-3">
                                                    {availableCategories.map((category) => {
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
                                                                        field.handleChange([...field.state.value, category.id]);
                                                                    }
                                                                }}
                                                                className={`px-4 py-2 cursor-pointer rounded-full border transition ${selected
                                                                    ? "bg-primary text-white border-primary"
                                                                    : "hover:border-primary"
                                                                    }`}
                                                            >
                                                                {category.name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </form.Field>

                                    </div>

                                    {/* SAVE */}
                                    <form.Subscribe
                                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                                    >
                                        {([canSubmit, isSubmitting]) => (
                                            <button
                                                type="submit"
                                                disabled={!canSubmit}
                                                className="px-6 py-3 cursor-pointer rounded-xl bg-primary text-white"
                                            >
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </button>
                                        )}
                                    </form.Subscribe>

                                </FieldGroup>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}


function SettingsCard({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className="rounded-3xl border bg-card/70 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-all "
        >
            <div className="mb-6">

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}

            </div>

            {children}

        </div>
    );
}
