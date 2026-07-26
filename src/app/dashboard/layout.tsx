import { redirect } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMobileNav from "@/components/dashboard/DashboardMobileNav";

import { userServerService } from "@/services/user/user.server.service";
import { dashboardLinks } from "@/constants/dashboard/dashboard-links";
import { User } from "@/types/user.type";
import DashboardProviders from "@/providers/DashboardProviders";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userServerService.getSession();
  const user: User | undefined = session?.data?.user;

  // MUST check first
  if (!user) {
    redirect("/");
  }

  const role = user.role as keyof typeof dashboardLinks;

  // fallback safety
  if (!role || !dashboardLinks[role]) {
    redirect("/");
  }


  return (
    <DashboardProviders>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar user={user} />

        {/* Mobile Nav */}
        <DashboardMobileNav user={user} title="Dashboard" />

        <div className="flex flex-1 min-w-0 min-h-0 flex-col">
          <DashboardHeader user={user} />

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </DashboardProviders>
  );
}