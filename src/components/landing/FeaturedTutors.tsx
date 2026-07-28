import { tutorServerService } from "@/services/tutor/tutor.server.service";
import FeaturedTutorsClient from "./FeaturedTutorsClient";


export default async function FeaturedTutors() {
  const [featuredTutorsRes, allTutorsRes] = await Promise.all([
    tutorServerService.getAllTutors({
      isFeatured: "true",
      limit: "4",
    }),
    tutorServerService.getAllTutors(),
  ]);


  return (
    <FeaturedTutorsClient
      tutors={featuredTutorsRes?.data?.data?.data}
      allTutorsCount={allTutorsRes?.data?.data?.meta?.total}
    />
  );
}