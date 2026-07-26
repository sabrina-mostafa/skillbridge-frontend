import {
  LayoutDashboard,
  User,
  Calendar,
  Video,
  Users,
  BookOpen,
  Wallet,
  MessageSquare,
  Star,
  Clock,
  CreditCard,
  BarChart3,
  GraduationCap,
  UserRound,
  Mail,
  FileText,
} from "lucide-react";
import { USER_ROLES } from "@/constants/user/UserRoles";


export type DashboardLink = {
  title: string;
  href: string;
  icon: React.ElementType;
};

export const dashboardLinks: Record<string, DashboardLink[]> = {
  [USER_ROLES.TUTOR]: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Students", href: "/dashboard/tutor/my-students", icon: Users },
    { title: "Availability", href: "/dashboard/tutor/availability", icon: Clock },
    { title: "Bookings", href: "/dashboard/tutor/bookings", icon: Calendar },
    { title: "Sessions", href: "/dashboard/tutor/sessions", icon: Video },
    { title: "Assignments", href: "/dashboard/tutor/assignments", icon: BookOpen },
    { title: "Messages", href: "/dashboard/tutor/messages", icon: MessageSquare },
    { title: "Earnings", href: "/dashboard/tutor/earnings", icon: Wallet },
    { title: "Reviews", href: "/dashboard/tutor/reviews", icon: Star },
    { title: "Profile", href: "/user", icon: User },
    // { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],

  [USER_ROLES.STUDENT]: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Tutors", href: "/dashboard/student/my-tutors", icon: Users },
    { title: "Bookings", href: "/dashboard/student/bookings", icon: Calendar },
    { title: "Sessions", href: "/dashboard/student/sessions", icon: Video },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: BookOpen },
    { title: "Messages", href: "/dashboard/student/messages", icon: MessageSquare },
    { title: "Payments", href: "/dashboard/student/payments", icon: CreditCard },
    { title: "Reviews", href: "/dashboard/student/reviews", icon: Star },
    { title: "Profile", href: "/user", icon: User },
    // { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],

  [USER_ROLES.ADMIN]: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Tutors", href: "/dashboard/admin/tutors", icon: GraduationCap },
    { title: "Students", href: "/dashboard/admin/students", icon: UserRound },
    { title: "Categories", href: "/dashboard/admin/categories", icon: BookOpen },
    { title: "Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
    { title: "Reviews", href: "/dashboard/admin/reviews", icon: Star },
    { title: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
    { title: "Inbox", href: "/dashboard/admin/inbox", icon: Mail },
    { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { title: "Reports", href: "/dashboard/admin/reports", icon: FileText },
    // { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
};