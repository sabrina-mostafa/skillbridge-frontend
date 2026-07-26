import { redirect } from "next/navigation";

import { USER_ROLES } from "@/constants/user/UserRoles";
import { adminServerService } from "@/services/admin/admin.server.service";
import { GetAllReviewsQuery } from "@/types/review.type";
import { userServerService } from "@/services/user/user.server.service";
import { reviewServerService } from "@/services/review/review.server.service";
import ReviewsManager from "@/components/dashboard/admin/reviews/ReviewsManager";


type Props = {
    searchParams: Promise<GetAllReviewsQuery>;
};

export default async function ReviewsPage({
    searchParams,
}: Props) {
    const filters = await searchParams;

    const session = await userServerService.getSession();
    const user = session?.data?.user;

    if (!user) redirect("/");

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    const [reviewsRes, analyticsRes] = await Promise.all([
        reviewServerService.getAll(filters),
        adminServerService.getPlatformAnalytics(),
    ]);


    return (
        <ReviewsManager
            reviews={reviewsRes.data?.data ?? []}
            meta={reviewsRes.data?.meta}
            analytics={analyticsRes.data?.data}
            initialFilters={filters}
        />
    );
}