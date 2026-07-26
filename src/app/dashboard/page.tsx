import { redirect } from "next/navigation";
import { userServerService } from "@/services/user/user.server.service";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { User } from "@/types/user.type";

export default async function DashboardPage() {
    const session = await userServerService.getSession();
    const user: User | undefined = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    switch (user.role) {
        case USER_ROLES.ADMIN:
            redirect("/dashboard/admin");

        case USER_ROLES.TUTOR:
            redirect("/dashboard/tutor");

        case USER_ROLES.STUDENT:
            redirect("/dashboard/student");

        default:
            redirect("/");
    }
}