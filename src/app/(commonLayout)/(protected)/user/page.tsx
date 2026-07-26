import { redirect } from "next/navigation";

import { createSlug } from "@/helpers/create-slug";
import { userServerService } from "@/services/user/user.server.service";

export default async function UserRootPage() {
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) {
        redirect("/");
    }

    redirect(
        `/user/${createSlug(user.name)}/profile`
    );
}