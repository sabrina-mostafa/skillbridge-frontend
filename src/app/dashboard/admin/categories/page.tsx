import CategoriesManager from "@/components/dashboard/admin/categories/CategoriesManager";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { adminServerService } from "@/services/admin/admin.server.service";
import { categoryService } from "@/services/category/category.service";
import { userServerService } from "@/services/user/user.server.service";
import { GetCategoryParams } from "@/types/category.type";
import { redirect } from "next/navigation";



export default async function CategoriesPage({
    searchParams
}: { searchParams: Promise<GetCategoryParams> }) {
    const session = await userServerService.getSession();

    const user = session?.data?.user;

    if (!user) redirect("/");

    if (user.role !== USER_ROLES.ADMIN) {
        redirect("/dashboard");
    }

    const params = await searchParams;

    const [categoriesRes, analyticsRes, parentsRes] = await Promise.all([
        categoryService.getAll(params),
        adminServerService.getPlatformAnalytics(),
        categoryService.getAll({
            parentOnly: true,
            limit: 'all',
        }),
    ]);


    return (
        <CategoriesManager
            categories={categoriesRes?.data?.data?.data}
            parentCategories={parentsRes?.data?.data?.data}
            meta={categoriesRes?.data?.data?.meta}
            analytics={analyticsRes.data.data}
        />
    );
}