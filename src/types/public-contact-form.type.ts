export interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    userType: string;
    inquiryType: string[];
    message: string;
}

export type PublicContactMessages = {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    userType: string;
    inquiryType: string[];
    message: string;
    createdAt: string;
};

export type GetAllMessagesQuery = {
  searchTerm?: string;
  userType?: string;
  inquiryType?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};