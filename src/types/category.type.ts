import { StudentCategory } from "./student.type";
import { TutorCategory } from "./tutor.types";


export interface GetCategoryParams {
  id?: string;
  search?: string;
  parentOnly?: boolean;
  childOnly?: boolean;
  hasTutors?: string;
  hasStudents?: string;
  withNoStudent?: string;
  withNoTutor?: string;
  page?: string;
  limit?: string | number;
  skip?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface CategoryBase {
  id: string;
  name: string;

  shortDesc: string | null;
  description: string | null;
  thumbnail: string | null;

  learningOutcomes: string[];

  isFeatured: boolean;

  parentId: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface Category extends CategoryBase {
  parent?: CategoryBase | null;

  _count: {
    tutors: number;
    students: number;
    children: number;
  };
}

export interface ParentCategory extends Category {
  children: CategoryBase[]
}

export interface AllCategoryProps {
  data: ParentCategory[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export interface ChildCategory extends CategoryBase {
  tutors: TutorCategory[];
  students: StudentCategory[];
}

export interface CategoryDetails extends CategoryBase {
  parent: CategoryBase | null;

  children: ChildCategory[];

  tutors: TutorCategory[];

  students: StudentCategory[];

  _count: {
    tutors: number;
    students: number;
    children: number;
  };
}

export interface CategoryDetailsResponse {
  data: CategoryDetails;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}