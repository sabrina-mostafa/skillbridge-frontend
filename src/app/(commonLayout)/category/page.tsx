import { categoryService } from "@/services/category/category.service";
import AllCategoryClient from "./_components/AllCategoryClient";



export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    hasTutors?: string;
    hasStudents?: string;
    withNoStudent?: string;
    withNoTutor?: string;

    page?: string;
    limit?: string;
    skip?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {

  const { search, hasTutors, hasStudents, withNoStudent, withNoTutor, page, limit, skip, sortBy, sortOrder } = await searchParams;

  const res = await categoryService.getAll({
    parentOnly: true,
    search,
    hasTutors,
    hasStudents,
    withNoStudent,
    withNoTutor,

    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  });

  const allCategories = res?.data?.data;

  return (
    <AllCategoryClient allCategories={allCategories} />
  );
}