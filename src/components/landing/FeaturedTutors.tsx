import { tutorClientService } from "@/services/tutor/tutor.client.service";
import FeaturedTutorsClient from "./FeaturedTutorsClient";


export default async function FeaturedTutors() {
  const [featuredTutorsRes, allTutorsRes] = await Promise.all([
    tutorClientService.getAllTutors({
      isFeatured: "true",
      limit: "4",
    }),
    tutorClientService.getAllTutors(),
  ]);


  return (
    <FeaturedTutorsClient
      tutors={featuredTutorsRes?.data?.data?.data}
      allTutorsCount={allTutorsRes?.data?.data?.meta?.total}
    />
  );
}