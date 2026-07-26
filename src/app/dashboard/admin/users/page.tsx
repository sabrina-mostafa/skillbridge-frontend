import { redirect } from "next/navigation";

import { USER_ROLES } from "@/constants/user/UserRoles";
import { userServerService } from "@/services/user/user.server.service";
import { adminServerService } from "@/services/admin/admin.server.service";
import UsersManager from "@/components/dashboard/admin/users/UsersManager";



export default async function AdminUsersPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        searchTerm?: string;
        role?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: string;
    }>;
}) {
    const params = await searchParams;
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) redirect("/");

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    const [usersRes, analyticsRes] = await Promise.all([
        adminServerService.getAllUsers({
            page: Number(params.page ?? 1),
            limit: 10,
            searchTerm: params.searchTerm,
            role:
                params.role === "ALL"
                    ? undefined
                    : params.role,
            status:
                params.status === "ALL"
                    ? undefined
                    : params.status,
            sortBy: params.sortBy,
            sortOrder:
                params.sortOrder === "asc"
                    ? "asc"
                    : "desc",
        }),
        adminServerService.getPlatformAnalytics(),
    ]);


    return (
        <div>
            <UsersManager
                users={usersRes.data?.data?.data ?? []}
                meta={usersRes.data?.data?.meta}
                analytics={analyticsRes.data?.data}
            />
        </div>
    );
}