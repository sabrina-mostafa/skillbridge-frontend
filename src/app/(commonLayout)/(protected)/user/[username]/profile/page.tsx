import { userServerService } from "@/services/user/user.server.service";
import { studentServerService } from "@/services/student/student.server.service";
import { tutorServerService } from "@/services/tutor/tutor.server.service";
import ProfilePreview from "./ProfilePreview";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { User } from "@/types/user.type";


export default async function ProfilePage() {

    const session = await userServerService.getSession();
    const user: User = session?.data?.user;

    console.log("session", session);

    let data;

    if (user.role === USER_ROLES.STUDENT) {

        const profile = await studentServerService.getMyProfile();

        data = {
            role: USER_ROLES.STUDENT,
            user,
            profile: profile?.data?.data,
        };

    } else {

        const profile = await tutorServerService.getMyProfile();

        data = {
            role: USER_ROLES.TUTOR,
            user,
            profile: profile?.data?.data,
        };

    }

    return (
        <ProfilePreview
            data={data}
            viewerId={user.id}
        />
    );
}