"use client";

import Link from "next/link";
import { User } from "@/types/user.type";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    UserCircle,
    Settings,
    LayoutDashboard,
    LogOut,
    ChevronDown,
    Home,
    GraduationCapIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSlug } from "@/helpers/create-slug";
import UserAvatar from "../common/UserAvatar";
import { useUIStore } from "@/store/ui-store";
import { useState } from "react";
import { X } from "lucide-react";
import { USER_ROLES } from "@/constants/user/UserRoles";


export default function UserDropdown({
    user,
}: {
    user: User;
}) {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");
    const isAdmin = user.role === USER_ROLES.ADMIN;

    const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            setOpen(false);
            setMobileMenuOpen(false)

            await authClient.signOut();

            router.push("/");
            router.refresh();

            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenuTrigger asChild>
                <button
                    className="cursor-pointer flex items-center gap-1 rounded-full p-1 transition outline-none"
                >
                    <UserAvatar
                        name={user.name}
                        image={user.image}
                    />
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuLabel>
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                            <span className="font-semibold truncate">
                                {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                                {user.email}
                            </span>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                            }}
                            className="rounded-md cursor-pointer p-1 hover:bg-muted"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {isDashboardRoute && (
                    <DropdownMenuItem asChild>
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                    <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/tutors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <GraduationCapIcon className="mr-2 h-4 w-4" />
                        Tutors
                    </Link>
                </DropdownMenuItem>

                {!isAdmin && (<DropdownMenuItem asChild>
                    <Link
                        href={`/user/${createSlug(user.name)}/profile`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>)}

                {!isAdmin && (<DropdownMenuItem asChild>
                    <Link
                        href={`/user/${createSlug(user.name)}/settings`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>)}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500 not-data-[variant=destructive]:focus:**:text-red-500 focus:bg-red-200"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}