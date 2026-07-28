import TopInstructorsClient from "./TopInstructorsClient";
import { tutorServerService } from "@/services/tutor/tutor.server.service";


export default async function TopInstructors() {
  const res = await tutorServerService.getAllTutors({
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