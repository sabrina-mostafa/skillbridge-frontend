import { categoryService } from "@/services/category/category.service";
import { notFound } from "next/navigation";
import CourseDetailsClient from "../_components/CourseDetailsClient";
import { CategoryDetails } from "@/types/category.type";


export default async function CoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await categoryService.getCategoryById(id);
    
    const course: CategoryDetails = res?.data?.data?.data;

    if (!course) return notFound();

    return <CourseDetailsClient course={course} />;
}