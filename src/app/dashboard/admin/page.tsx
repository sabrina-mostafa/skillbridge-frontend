import { redirect } from "next/navigation";
import {
  Users,
  GraduationCap,
  MessageSquare,
  Wallet,
  UserRound,
  TrendingUp,
  CheckCircle2,
  Activity,
  LibraryBig,
} from "lucide-react";

import { userServerService } from "@/services/user/user.server.service";
import { adminServerService } from "@/services/admin/admin.server.service";
import { USER_ROLES } from "@/constants/user/UserRoles";

import DashboardHeaderSection from "@/components/dashboard/common/DashboardHeaderSection";
import StatsGrid from "@/components/dashboard/common/StatsGrid";
import ActionGrid from "@/components/dashboard/common/ActionGrid";
import { Analytics } from "@/types/analytics.type";


export default async function AdminDashboardPage() {
  const session = await userServerService.getSession();
  const user = session?.data?.user;

  if (!user) redirect("/");
  if (user.role !== USER_ROLES.ADMIN) redirect("/dashboard");

  const analyticsRes = await adminServerService.getPlatformAnalytics();
  const analytics = analyticsRes.data?.data as Analytics;


  return (
    <div className="space-y-8">
      <DashboardHeaderSection
        title="Admin Dashboard"
        description="Monitor platform activity, users, bookings and overall system health."
      />

      <StatsGrid
        items={[
          {
            label: "Total Users",
            value: analytics?.overview?.totalUsers ?? 0,
            description: "Registered accounts",
            icon: Users,
            href: "/dashboard/admin/users",
          },
          {
            label: "Tutors",
            value: analytics?.overview?.activeTutors ?? 0,
            description: "Active tutors",
            icon: GraduationCap,
            href: "/dashboard/admin/tutors",
          },
          {
            label: "Students",
            value: analytics?.overview?.activeStudents ?? 0,
            description: "Active students",
            icon: UserRound,
            href: "/dashboard/admin/students",
          },
          {
            label: "All Categories",
            value: analytics?.overview?.totalCategories ?? 0,
            description: "Available subjects",
            icon: LibraryBig,
            href: "/dashboard/admin/categories",
          },
          {
            label: "New Users (30 Days)",
            value: analytics?.users?.last30DaysUsers ?? 0,
            description: "Recent platform growth",
            icon: TrendingUp,
            href: "/dashboard/admin/analytics",
          },
          {
            label: "Today's Revenue",
            value: `৳${analytics?.revenue?.today ?? 0}`,
            description: "Revenue generated today",
            icon: Wallet,
            href: "/dashboard/admin/payments",
          },
          {
            label: "Received Messages",
            value: analytics?.overview?.totalMessages ?? 0,
            description: "Customer inquiries",
            icon: MessageSquare,
            href: "/dashboard/admin/inbox",
          },
        ]}
      />

      <ActionGrid
        title="Quick Actions"
        actions={[
          {
            label: "Manage Users",
            variant: "primary",
            href: "/dashboard/admin/users",
          },
          {
            label: "View Reports",
            variant: "outline",
            href: "/dashboard/admin/reports",
          },
          {
            label: "Analytics",
            href: "/dashboard/admin/analytics",
          },
          {
            label: "Payments",
            variant: "outline",
            href: "/dashboard/admin/payments",
          },
          {
            label: "Bookings",
            variant: "outline",
            href: "/dashboard/admin/bookings",
          },
          {
            label: "Messages",
            variant: "outline",
            href: "/dashboard/admin/contact-messages",
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Booking Overview
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Today&apos;s Bookings
              </span>
              <span className="font-bold">
                {analytics?.bookings?.today}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Completed
              </span>
              <span className="font-bold text-green-600">
                {analytics?.bookings?.completed}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Cancelled
              </span>
              <span className="font-bold text-red-500">
                {analytics?.bookings?.cancelled}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Avg / Day
              </span>
              <span className="font-bold">
                {analytics?.bookings?.avgPerDay}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Platform Growth
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-4xl font-bold">
                {analytics?.users?.last30DaysUsers}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                New users joined in the last 30 days.
              </p>
            </div>

            <div className="border-t pt-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Completion Rate
                </span>
                <span className="font-semibold text-green-600">
                  {analytics?.kpis?.completionRate}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Cancellation Rate
                </span>
                <span className="font-semibold text-red-500">
                  {analytics?.kpis?.cancellationRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Platform Health
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Reviews
              </span>
              <span className="font-bold">
                {analytics?.reviews?.total}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Avg Rating
              </span>
              <span className="font-bold">
                ⭐ {analytics?.reviews?.averageRating}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Categories
              </span>
              <span className="font-bold">
                {analytics?.categories?.total}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Messages
              </span>
              <span className="font-bold">
                {analytics?.contacts?.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}