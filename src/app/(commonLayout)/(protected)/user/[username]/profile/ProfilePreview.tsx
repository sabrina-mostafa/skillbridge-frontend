import { AccountLinkingSection } from "@/components/auth/AccountLinking";
import UserAvatar from "@/components/common/UserAvatar";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { createSlug } from "@/helpers/create-slug";
import { cn } from "@/lib/utils";
import { CategoryBase } from "@/types/category.type";
import { DashboardProfile } from "@/types/profile.type";
import { BadgeDollarSign, BookMarked, BookOpen, BriefcaseBusiness, GraduationCap, ShieldCheck, Star, UserPen, UserRound } from "lucide-react";
import Link from "next/link";

type ProfilePreviewProps = {
    data: DashboardProfile;
    viewerId: string;
};

export default function ProfilePreview({
    data,
    viewerId,
}: ProfilePreviewProps) {

    const isOwner = viewerId === data.user.id;

    const theme =
        data.role === USER_ROLES.STUDENT
            ? "from-indigo-500 via-indigo-800 to-primary"
            : "from-primary via-indigo-800 to-indigo-500";

    return (
        <div className="relative px-6 xl:px-0 min-h-screen sm:pt-36 pt-30 pb-16 overflow-hidden">

            {/* GRID PATTERN (same as reference) */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #6366f1 1px, transparent 60px), linear-gradient(to bottom, #6366f1 1px, transparent 30px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* LAYERED GRADIENT BLOBS (premium depth system) */}
            <div className="absolute inset-0 pointer-events-none">

                {/* top right main light */}
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[120px]" />

                {/* bottom left secondary light */}
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-400/20 blur-[120px]" />

                {/* center soft spotlight */}
                <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-[100px]" />
            </div>

            {/* SOFT EDGE GLOW (adds premium depth) */}
            <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-indigo-400/10 blur-[120px] rounded-full" />

            {/* CONTENT */}
            <div className="relative bg-indigo-800/20 dark:bg-gray-800 rounded-4xl sm:rounded-xl border border-primary/20 max-w-5xl mx-auto md:p-10 p-8 space-y-10">

                <div className="mb-4">
                    <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                        User Profile
                    </span>
                </div>

                {/* HERO CARD WITH GRADIENT BORDER */}
                <div className="relative p-0.5 sm:rounded-3xl rounded-2xl bg-gradient-to-r from-primary/40 via-violet-500/40 to-primary/40">

                    <div className="rounded-3xl bg-card/70 backdrop-blur-xl p-8 flex md:flex-row flex-col sm:items-center gap-4 justify-between">
                        <div className="flex sm:flex-row flex-col items-center gap-6">
                            {/* AVATAR WITH GRADIENT RING */}
                            <div className="relative">
                                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${theme} blur-md opacity-70`} />

                                <UserAvatar
                                    name={data.user.name}
                                    image={data.user.image}
                                    className="relative w-24 h-24 text-3xl rounded-3xl border border-transparent"
                                />

                                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                            </div>

                            {/* NAME BLOCK */}
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {data.user.name}
                                </h1>

                                <div className="flex items-center sm:gap-2 gap-4">
                                    <span className={`
                                        text-xs px-3 py-1 rounded-full
                                        bg-gradient-to-r ${theme} text-white
                                        shadow-sm
                                    `}>
                                        {data.role}
                                    </span>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <span>SkillBridge</span>
                                            <span className="h-1 w-1 rounded-full bg-muted-foreground" />

                                        </div>
                                        <span className="flex items-center gap-1">
                                            <ShieldCheck className="size-3.5 text-primary" />
                                            Verified Member
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 items-center">
                            <div className="sm:w-fit w-full">
                                {isOwner && (
                                    <Link
                                        href={`/user/${createSlug(data.user.name)}/settings`}
                                    >
                                        <button
                                            className={`px-5 py-2.5 w-full flex justify-center gap-2 items-center cursor-pointer rounded-full text-sm text-center font-medium
                                    bg-gradient-to-r ${theme}
                                    text-white shadow-md
                                    hover:scale-[1.02] transition`}
                                        >
                                            <UserPen className="size-4" />
                                            Edit Profile
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <div className="w-full">
                                <AccountLinkingSection theme={theme} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="grid gap-6">
                    <GlassSection
                        title="About"
                        icon={<UserRound className="size-4 text-primary" />}
                    >
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {data?.profile?.bio || "No bio added yet."}
                        </p>
                    </GlassSection>

                    <GlassSection
                        title="Education"
                        icon={<GraduationCap className="size-4 text-primary" />}
                    >
                        <p className="text-sm">
                            {data?.profile?.education || "Not provided"}
                        </p>
                    </GlassSection>

                    {data.role !== USER_ROLES.STUDENT && (
                        <div className="grid md:grid-cols-3 gap-5">

                            <StatCard
                                icon={<BriefcaseBusiness className="size-4 text-primary" />}
                                label="Experience"
                                value={data?.profile?.experience || "0 years"}
                                theme={theme}
                            />

                            <StatCard
                                icon={<BadgeDollarSign className="size-4 text-primary" />}
                                label="Hourly Rate"
                                value={`$${data?.profile?.hourlyRate || 0}`}
                                theme={theme}
                            />

                            <StatCard
                                icon={<Star className="size-4 text-primary fill-primary" />}
                                label="Rating"
                                value={data?.profile?.avgRating?.toFixed(1) || "N/A"}
                                theme={theme}
                            />

                        </div>
                    )}

                    <GlassSection
                        title={
                            data?.role === USER_ROLES.STUDENT
                                ? "Learning Interests"
                                : "Teaching Interests"
                        }
                        icon={
                            data?.role === USER_ROLES.STUDENT
                                ? <BookOpen className="size-4 text-primary" />
                                : <BookMarked className="size-4 text-primary" />
                        }
                    >
                        <div className="flex flex-wrap gap-2">

                            {data?.profile?.categories?.length ? (
                                data?.profile?.categories.map((c: CategoryBase) => (
                                    <span
                                        key={c.id}
                                        className={`
                                            px-3 py-1 text-xs rounded-full
                                            border
                                            bg-white/40 dark:bg-white/10
                                            hover:bg-gradient-to-r ${theme}
                                            hover:text-white
                                            transition
                                        `}
                                    >
                                        {c.name}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No categories selected
                                </p>
                            )}

                        </div>

                    </GlassSection>

                </div>
            </div>
        </div >
    );
}


function GlassSection({
    title,
    icon,
    children,
    className,
}: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "sm:rounded-3xl rounded-xl border-2 border-primary/40 bg-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition",
                className
            )}
        >
            <div className="flex items-center gap-2 mb-1">
                {icon && (
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>
                )}
                <h2 className="text-xs uppercase border-b border-b-primary tracking-widest text-gray-700 dark:text-accent-foreground font-semibold pb-1">
                    {title}
                </h2>
            </div>

            <div className="pl-10">
                {children}
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    theme,
    icon,
}: {
    label: string;
    value: string;
    theme: string;
    icon?: React.ReactNode;
}) {
    return (
        <div
            className="
        relative overflow-hidden
        sm:rounded-3xl rounded-xl
        border-2 border-primary/40
        bg-card/70
        backdrop-blur-xl
        p-5
        hover:-translate-y-1
        transition
      "
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${theme} opacity-10`}
            />

            <div className="relative space-y-1">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>
                    <p className="text-xs text-muted-foreground border-b border-b-primary">{label}</p>
                </div>
                <p className="text-md font-semibold pl-8">{value}</p>
            </div>
        </div>
    );
}
