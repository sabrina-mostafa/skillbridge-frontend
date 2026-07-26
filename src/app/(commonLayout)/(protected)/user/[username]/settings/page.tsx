import { userServerService } from "@/services/user/user.server.service";
import { studentServerService } from "@/services/student/student.server.service";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { categoryService } from "@/services/category/category.service";
import ProfileSettingsClient from "./ProfileSettingsClient";
import { tutorServerService } from "@/services/tutor/tutor.server.service";


export default async function ProfileSettingsPage() {
    const session = await userServerService.getSession();
    const user = session?.data?.user;

    let profile = null;

    if (user.role === USER_ROLES.STUDENT) {
        profile = await studentServerService.getMyProfile();

    } else {
        profile = await tutorServerService.getMyProfile();

    }

    const categoryResult = await categoryService.getAll({
        childOnly: true,
        limit: Number.MAX_SAFE_INTEGER,
    });

    const categories = categoryResult?.data?.data?.data;


    return (
        <ProfileSettingsClient
            user={user}
            profile={profile?.data?.data}
            categories={categories}
        />
    );
}