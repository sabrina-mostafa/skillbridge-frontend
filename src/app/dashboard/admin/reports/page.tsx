import { redirect } from "next/navigation";

import ReportsManager from "@/components/dashboard/admin/reports/ReportsManager";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { userServerService } from "@/services/user/user.server.service";


export default async function ReportsPage() {
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    return (
        <div>
            <ReportsManager />
        </div>
    );
}