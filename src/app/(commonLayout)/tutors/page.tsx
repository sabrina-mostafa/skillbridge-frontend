import AllTutorsClient from "@/components/core/tutors/AllTutorsClient";
import { tutorServerService } from "@/services/tutor/tutor.server.service";


export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    isFeatured?: string;
    course?: string;
    searchTerm?: string;
    minRating?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }>;
}) {

  const { isFeatured, course, searchTerm, minRating, minPrice, maxPrice, page, limit } = await searchParams;

  const filteredRes = await tutorServerService.getAllTutors({ isFeatured, course, searchTerm, minRating, minPrice, maxPrice, page, limit });

  const allRes = await tutorServerService.getAllTutors({});


  return (
    <AllTutorsClient
      allTutors={filteredRes?.data?.data?.data}
      meta={filteredRes?.data?.data?.meta}
      allTutorsCount={allRes?.data?.data?.meta?.total}
    />
  );
}