import SessionManager from "@/components/dashboard/tutor/session/SessionManager";
import { userServerService } from "@/services/user/user.server.service";

export default async function SessionsPage() {

    const session = await userServerService.getSession();
    const user = session?.data?.user;

    return <SessionManager user={user} />;
}