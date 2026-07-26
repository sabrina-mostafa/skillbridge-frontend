import BookingsManager from "@/components/dashboard/admin/bookings/BookingsManager";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { adminServerService } from "@/services/admin/admin.server.service";
import { bookingServerService, GetAllBookingFilters } from "@/services/booking/booking.server.service";
import { userServerService } from "@/services/user/user.server.service";
import { redirect } from "next/navigation";

type Props = {
    searchParams: Promise<GetAllBookingFilters>;
};

export default async function BookingsPage({
    searchParams,
}: Props) {
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) redirect("/");

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }
    const query = await searchParams;

    const [bookingsResponse, analytics] = await Promise.all([
        bookingServerService.getAll(query),
        adminServerService.getPlatformAnalytics(),
    ]);


    return (
        <BookingsManager
            bookings={bookingsResponse?.data?.data ?? []}
            meta={bookingsResponse?.data?.meta}
            analytics={analytics?.data?.data}
            initialFilters={query}
        />
    );
}