import ConversationClient from "@/components/dashboard/tutor/messages/ConversationClient";
import { userServerService } from "@/services/user/user.server.service";
import { User } from "@/types/user.type";


export default async function MessagesPage() {
    const session = await userServerService.getSession();
    const user: User = session?.data?.user;

    return <ConversationClient currentUser={user} />;
}