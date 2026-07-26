"use server"

import { studentServerService } from "@/services/student/student.server.service";

type UpdateStudentProfilePayload = {
    bio?: string;
    education?: string;
    categories?: string[];
};


export const updateStudentProfile = async (
    studentId: string,
    payload: UpdateStudentProfilePayload,
) => {
    console.log("id2:", studentId);

    const res = await studentServerService.updateProfile(studentId, payload);
    console.log("res from action:", res);

    return res;
}