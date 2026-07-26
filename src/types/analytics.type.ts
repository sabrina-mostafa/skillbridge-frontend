import { BookingStatus } from "@/constants/booking/BookingStatus";

export interface Analytics {
  overview: AnalyticsOverview;
  users: AnalyticsUsers;
  categories: AnalyticsCategories;
  bookings: AnalyticsBookings;
  reviews: AnalyticsReviews;
  contacts: AnalyticsContacts;
  revenue: AnalyticsRevenue;
  kpis: AnalyticsKPIs;
  charts: AnalyticsCharts;
}

export interface AnalyticsOverview {
  totalUsers: number;
  activeTutors: number;
  activeStudents: number;
  completedTutorProfiles: number;
  completedStudentProfiles: number;
  featuredTutors: number;
  totalCategories: number;
  totalBookings: number;
  totalReviews: number;
  totalMessages: number;
}

export interface AnalyticsUsers {
  total: number;
  activeTutors: number;
  activeStudents: number;
  completedTutorProfiles: number;
  completedStudentProfiles: number;
  last30DaysUsers: number;
  last30DaysTutors: number;
  last30DaysStudents: number;
}

export interface AnalyticsCategories {
  total: number;
  parentCategories: number;
  childCategories: number;
  assignedTutors: number;
}

export interface AnalyticsBookings {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  statusBreakdown: BookingStatusBreakdown[];
  last7Days: BookingsPerDay[];
  avgPerDay: number;
}

export interface BookingStatusBreakdown {
  status: BookingStatus;
  _count: {
    status: number;
  };
}

export interface BookingsPerDay {
  date: string;
  count: number;
}

export interface AnalyticsReviews {
  total: number;
  averageRating: number;
}

export interface AnalyticsContacts {
  total: number;
}

export interface AnalyticsRevenue {
  today: number;
  last7Days: number;
}

export interface AnalyticsKPIs {
  completionRate: number;
  cancellationRate: number;
}

export interface AnalyticsCharts {
  bookingsLast7Days: BookingsPerDay[];
}