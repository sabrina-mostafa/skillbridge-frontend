"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { USER_ROLES } from "@/constants/user/UserRoles";

type DashboardNavProps = {
  links: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
};

export default function DashboardNav({
  links,
}: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
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
  );
}