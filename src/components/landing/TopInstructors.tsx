import { tutorClientService } from "@/services/tutor/tutor.client.service";
import TopInstructorsClient from "./TopInstructorsClient";


export default async function TopInstructors() {
  const res = await tutorClientService.getAllTutors({
    limit: "5",
    sortBy: "avgRating",
    sortOrder: "desc",
  });


  return (
    <TopInstructorsClient
      tutors={res?.data?.data?.data ?? []}
    />
  );
}