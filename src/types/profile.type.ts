import { Student } from "./student.type";
import { Tutor } from "./tutor.types";
import { User } from "./user.type";



export type DashboardProfile =
    | {
        role: "STUDENT";
        user: User;
        profile: Student;
    }
    | {
        role: "TUTOR";
        user: User;
        profile: Tutor;
    };