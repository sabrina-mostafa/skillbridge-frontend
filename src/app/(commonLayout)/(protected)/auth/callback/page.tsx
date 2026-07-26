import { redirect } from "next/navigation";
import { userServerService } from "@/services/user/user.server.service";
import { User } from "@/types/user.type";
import { USER_ROLES } from "@/constants/user/UserRoles";

export default async function AuthCallbackPage() {

    const session = await userServerService.getSession();
    const user: User = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    if (!user.emailVerified) {
        redirect(`/verify-email?email=${user.email}`);
    }

    if (!user.role) {
        redirect("/onboarding");
    }

    if (user.role && user.role === USER_ROLES.ADMIN) {
        redirect(`/dashboard/${user.role.toLowerCase()}`);
    }

    if (user.role && !user.profileCompleted) {
        redirect(`/onboarding/${user.role.toLowerCase()}`);
    }

    redirect("/dashboard");
}