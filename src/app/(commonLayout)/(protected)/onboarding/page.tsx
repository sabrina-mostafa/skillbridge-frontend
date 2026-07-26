"use client";

import { USER_ROLES, UserRoles } from "@/constants/user/UserRoles";
import { userClientService } from "@/services/user/user.client.service";
import { BookOpen, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function OnboardingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRoles | null>(null);

    const router = useRouter();

    const handleRoleSelect = async (
        role: UserRoles
    ) => {
        try {
            setIsLoading(true);

            const result = await userClientService.updateRole(role);

            if (result.error) {
                console.error(result.error);
                return;
            }

            if (role === USER_ROLES.STUDENT) {
                router.push("/onboarding/student");
            } else if (role === USER_ROLES.TUTOR) {
                router.push("/onboarding/tutor");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen relative overflow-hidden">

            {/* Background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 60px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-400/20 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-400/20 blur-[120px]" />
            </div>

            <div className="relative mt-5 max-w-6xl mx-auto px-6 py-24">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">

                    <span className="inline-flex bg-indigo-100 dark:bg-gray-800 font-bold text-primary items-center rounded-full border px-4 py-1 text-sm mb-6">
                        Step 1 of 3
                    </span>

                    <h1 className="text-5xl font-bold tracking-tight">
                        Welcome to SkillBridge
                    </h1>

                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose a role to personalize your experience. You can always change this later.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">

                    {/* Student */}
                    <button
                        disabled={isLoading}
                        onClick={() => handleRoleSelect(USER_ROLES.STUDENT)}
                        className={`
                            group cursor-pointer bg-white dark:bg-gray-800 hover:border-primary relative text-left rounded-2xl border p-8 transition-all
                            hover:shadow-xl hover:-translate-y-1
                            focus:outline-none focus:ring-2 focus:ring-primary
                            ${selectedRole === USER_ROLES.STUDENT ? "border-primary shadow-lg" : ""}
                            ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="w-7 h-7 text-primary" />
                            </div>

                            {selectedRole === USER_ROLES.STUDENT && (
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white">
                                    Selected
                                </span>
                            )}
                        </div>

                        <h2 className="text-2xl font-semibold mt-6">
                            Student
                        </h2>

                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Learn from expert tutors, book sessions, track progress, and grow your skills with structured learning paths.
                        </p>

                        <div className="mt-6 text-sm text-primary font-medium">
                            Start learning →
                        </div>
                    </button>

                    {/* Tutor */}
                    <button
                        disabled={isLoading}
                        onClick={() => handleRoleSelect(USER_ROLES.TUTOR)}
                        className={`
                            group relative text-left cursor-pointer dark:bg-gray-800 bg-white hover:border-primary rounded-2xl border p-8 transition-all
                            hover:shadow-xl hover:-translate-y-1
                            focus:outline-none focus:ring-2 focus:ring-primary
                            ${selectedRole === USER_ROLES.TUTOR ? "border-primary shadow-lg" : ""}
                            ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-7 h-7 text-primary" />
                            </div>

                            {selectedRole === USER_ROLES.TUTOR && (
                                <span className="text-xs px-3 py-1 rounded-full bg-purple-500 text-white">
                                    Selected
                                </span>
                            )}
                        </div>

                        <h2 className="text-2xl font-semibold mt-6">
                            Tutor
                        </h2>

                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Teach students, manage bookings, build your reputation, and grow your tutoring career on a modern platform.
                        </p>

                        <div className="mt-6 text-sm text-primary font-medium">
                            Start teaching →
                        </div>
                    </button>

                </div>
            </div>
        </section>
    );
}