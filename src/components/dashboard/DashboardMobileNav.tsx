"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { User } from "@/types/user.type";
import { dashboardLinks } from "../../constants/dashboard/dashboard-links";
import { USER_ROLES } from "@/constants/user/UserRoles";

type Props = {
    user: User;
    title: string;
};

export default function DashboardMobileNav({
    user,
    title,
}: Props) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = dashboardLinks[user.role];

    return (
        <div className="md:hidden border flex border-b px-4 py-3 bg-background">
            {/* <h1 className="font-semibold text-lg">{title}</h1> */}

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="p-2 flex h-fit rounded-md border">
                        <Menu className="w-5 h-5" />
                    </button>
                </SheetTrigger>

                <SheetContent side="left" className="w-72 p-4 bg-transparent">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold border-b-2 border-primary/50 pb-3">{title}</SheetTitle>
                    </SheetHeader>

                    <nav className="mt-2 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;

                            const isActive = (href: string) => {
                                if (href === "/dashboard") {
                                    return (
                                        pathname === "/dashboard" ||
                                        pathname === `/dashboard/${(USER_ROLES.ADMIN).toLowerCase()}` ||
                                        pathname === `/dashboard/${(USER_ROLES.TUTOR).toLowerCase()}` ||
                                        pathname === `/dashboard/${(USER_ROLES.STUDENT.toLowerCase())}`
                                    );
                                }

                                return pathname === href || pathname.startsWith(href + "/");
                            };
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-3 transition",

                                        active
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />

                                    <span className="font-medium">
                                        {link.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}