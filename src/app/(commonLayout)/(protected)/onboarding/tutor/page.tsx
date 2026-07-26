import { categoryService } from "@/services/category/category.service";
import { CategoryBase } from "@/types/category.type";
import TutorOnboardingPage from "./TutorOnboardingPage";

export default async function Page() {
    const result = await categoryService.getAll({
        childOnly: true,
        limit: Number.MAX_SAFE_INTEGER,
    });

    const categories: CategoryBase[] = result.data?.data?.data ?? [];


    return (
        <TutorOnboardingPage
            categories={categories}
        />
    );
}
