import { redirect } from "next/navigation";
import {
  CalendarClock,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import { USER_ROLES } from "@/constants/user/UserRoles";
import { userServerService } from "@/services/user/user.server.service";
import { bookingServerService } from "@/services/booking/booking.server.service";

import DashboardHeaderSection from "@/components/dashboard/common/DashboardHeaderSection";
import StatsGrid from "@/components/dashboard/common/StatsGrid";
import ActionGrid from "@/components/dashboard/common/ActionGrid";
import { getTutorDashboardStats } from "@/utils/dashboard/getTutorDashboardStats";


export default async function TutorDashboardPage() {
  const session = await userServerService.getSession();
  const user = session?.data?.user;

  if (!user) redirect("/");
  if (user.role !== USER_ROLES.TUTOR) redirect("/dashboard");

  const bookingsRes = await bookingServerService.getMine({
    page: 1,
    limit: 1000,
  });

  const stats = getTutorDashboardStats(
    bookingsRes.data?.data ?? []
  );

  return (
    <div className="space-y-6">
      <DashboardHeaderSection
        title="Tutor Dashboard"
        description={`Welcome back, ${user.name}. Manage your students and tutoring sessions.`}
      />

      <StatsGrid
        items={[
          {
            label: "My Students",
            value: stats.students,
            description: "Students you've taught",
            icon: Users,
            href: "/dashboard/tutor/my-students",
          },
          {
            label: "Upcoming Sessions",
            value: stats.upcomingSessions,
            description: "Scheduled lessons",
            icon: CalendarClock,
            href: "/dashboard/tutor/sessions",
          },
          {
            label: "Average Rating",
            value: stats.averageRating.toFixed(1),
            description: `${stats.totalReviews} reviews received`,
            icon: Star,
            href: "/dashboard/tutor/reviews",
          },
          {
            label: "Total Earnings",
            value: `৳${stats.totalEarnings.toLocaleString()}`,
            description: "Lifetime earnings",
            icon: Wallet,
            href: "/dashboard/tutor/earnings",
          },
        ]}
      />

      <ActionGrid
        title="Quick Actions"
        actions={[
          {
            label: "View Students",
            variant: "primary",
            href: "/dashboard/tutor/my-students",
          },
          {
            label: "Manage Availability",
            variant: "outline",
            href: "/dashboard/tutor/availability",
          },
          {
            label: "Check Messages",
            variant: "outline",
            href: "/dashboard/tutor/messages",
          },
        ]}
      />
    </div>
  );
}