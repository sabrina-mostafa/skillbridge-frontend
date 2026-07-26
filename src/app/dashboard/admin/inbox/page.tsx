import { redirect } from "next/navigation";

import { USER_ROLES } from "@/constants/user/UserRoles";
import { adminServerService } from "@/services/admin/admin.server.service";
import { userServerService } from "@/services/user/user.server.service";
import InboxManager from "@/components/dashboard/admin/inbox/InboxManager";
import { GetAllMessagesQuery } from "@/types/public-contact-form.type";


export default async function InboxPage({
    searchParams,
}: {
    searchParams: Promise<GetAllMessagesQuery>;
}) {
    const query = await searchParams;

    const session = await userServerService.getSession();
    const user = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    const [allMessagesRes, filteredMessagesRes] = await Promise.all([
        adminServerService.getContactMessages(),
        adminServerService.getContactMessages(query),
    ]);

    return (
        <InboxManager
            allMessages={allMessagesRes.data?.data?.data ?? []}
            messages={filteredMessagesRes.data?.data?.data ?? []}
            meta={filteredMessagesRes.data?.data?.meta}
        />
    );
}