import { notFound } from "next/navigation";
import TutorDetailsClient from "../../../../components/core/tutors/TutorDetailsClient";
import { userServerService } from "@/services/user/user.server.service";
import { User } from "@/types/user.type";
import { tutorServerService } from "@/services/tutor/tutor.server.service";



export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  
  const session = await userServerService.getSession();
  const user: User = session?.data?.user;

  const { id } = await params;

  const res = await tutorServerService.getTutorById(id);

  const tutor = res?.data?.data;

  if (!tutor) {
    notFound();
  }

  return <TutorDetailsClient tutor={tutor} user={user} />;
}
