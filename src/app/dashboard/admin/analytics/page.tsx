import { redirect } from "next/navigation";

import { USER_ROLES } from "@/constants/user/UserRoles";
import { userServerService } from "@/services/user/user.server.service";
import { adminServerService } from "@/services/admin/admin.server.service";
import AnalyticsManager from "@/components/dashboard/admin/analytics/AnalyticsManager";


export default async function AdminAnalyticsPage() {
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    const analyticsRes = await adminServerService.getPlatformAnalytics();

    
    return (
        <AnalyticsManager
            analytics={analyticsRes.data?.data}
        />
    );
}