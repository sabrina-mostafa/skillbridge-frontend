"use client";

import Link from "next/link";
import DashboardNav from "./DashboardNav";
import { dashboardLinks } from "../../constants/dashboard/dashboard-links";

import { User } from "@/types/user.type";

export default function DashboardSidebar({
  user,
}: {
  user: User;
}) {
  const links = dashboardLinks[user.role];

  return (
    <aside className="hidden md:flex w-72 border-r p-6 flex-col">

      <Link
        href="/"
        className="text-2xl font-bold mb-8"
      >
        Skill
        <span className="text-primary">
          BRIDGE
        </span>
      </Link>

      <DashboardNav links={links} />

    </aside>
  );
}