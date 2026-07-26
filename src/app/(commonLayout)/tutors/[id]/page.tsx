import { tutorClientService } from "@/services/tutor/tutor.client.service";
import { notFound } from "next/navigation";
import TutorDetailsClient from "../../../../components/core/tutors/TutorDetailsClient";



export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await tutorClientService.getTutorById(id);

  const tutor = res?.data?.data;

  if (!tutor) {
    notFound();
  }

  return <TutorDetailsClient tutor={tutor} />;
}
