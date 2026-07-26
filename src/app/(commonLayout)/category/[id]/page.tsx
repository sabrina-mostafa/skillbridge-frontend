import { categoryService } from "@/services/category/category.service";
import CategoryCoursesClient from "./_components/CategoryCoursesClient";
import { CategoryDetailsResponse } from "@/types/category.type";


export default async function CategoryDetailsPage({
    params,
    searchParams,
}: {
    params: Promise<{
        id: string;
    }>;
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
    const { id } = await params;
    const { search, hasTutors, hasStudents, withNoStudent, withNoTutor, page, limit, skip, sortBy, sortOrder } = await searchParams;
    const res = await categoryService.getById({ id, search, hasTutors, hasStudents, withNoStudent, withNoTutor, page, limit, skip, sortBy, sortOrder });

    const categoryResponse: CategoryDetailsResponse = res?.data?.data;

    return (
        <CategoryCoursesClient categoryResponse={categoryResponse} />
    );
}