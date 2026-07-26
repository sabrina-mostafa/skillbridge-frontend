import { redirect } from "next/navigation";
import { userServerService } from "@/services/user/user.server.service";
import { USER_ROLES } from "@/constants/user/UserRoles";
import DashboardHeaderSection from "@/components/dashboard/common/DashboardHeaderSection";
import StatsGrid from "@/components/dashboard/common/StatsGrid";
import ActionGrid from "@/components/dashboard/common/ActionGrid";
import { CalendarDays, CheckCircle, ClipboardList, Users } from "lucide-react";
import { getStudentDashboardStats } from "@/utils/dashboard/getStudentDashboardStats";
import { bookingServerService } from "@/services/booking/booking.server.service";



export default async function StudentDashboardPage() {
  const session = await userServerService.getSession();
  const user = session?.data?.user;

  if (!user) redirect("/");
  if (user.role !== USER_ROLES.STUDENT) redirect("/dashboard");

  const bookingsRes = await bookingServerService.getMine({
    page: 1,
    limit: 1000,
  });

  const stats = getStudentDashboardStats(
    bookingsRes.data?.data ?? []
  );



  return (
    <div className="space-y-6">

      <DashboardHeaderSection
        title="Student Dashboard"
        description={`Welcome back, ${user.name}. Continue your learning journey.`}
      />

      <StatsGrid
        items={[
          {
            label: "My Tutors",
            value: stats.tutors,
            description: "Tutors you've learned from",
            icon: Users,
            href: "/dashboard/student/my-tutors",
          },
          {
            label: "Upcoming Sessions",
            value: stats.upcomingSessions,
            description: "Scheduled classes",
            icon: CalendarDays,
            href: "/dashboard/student/sessions",
          },
          {
            label: "Completed Sessions",
            value: stats.completedSessions,
            description: "Lessons completed",
            icon: CheckCircle,
            href: "/dashboard/student/sessions",
          },
          {
            label: "Pending Assignments",
            value: stats.pendingAssignments,
            description: "Need your attention",
            icon: ClipboardList,
            href: "/dashboard/student/assignments",
          },
        ]}
      />

      <ActionGrid
        title="Quick Actions"
        actions={[
          { label: "Find Tutors", variant: "primary", href: "/tutors" },
          { label: "View Bookings", variant: "outline", href: "/dashboard/student/bookings" },
          { label: "Open Messages", variant: "outline", href: "/dashboard/student/messages" },
        ]}
      />
    </div>
  );
}