"use server"

import { userServerService } from "@/services/user/user.server.service";


export const getUserSession = async () => {

    const res = await userServerService.getSession();
    return res;
}