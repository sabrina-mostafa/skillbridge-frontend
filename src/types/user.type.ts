import { UserRoles } from "@/constants/user/UserRoles";
import { UserStatus } from "@/constants/user/UserStatus";
import { Tutor } from "./tutor.types";
import { CategoryBase } from "./category.type";


export interface TutorProfileForAdmin extends Omit<Tutor, "categories"> {
    categories: {
        category: CategoryBase;
    }[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    role: UserRoles;
    status: UserStatus;
    profileCompleted: boolean;

    tutorProfile?: TutorProfileForAdmin;

    createdAt: string;
    updatedAt: string;
};