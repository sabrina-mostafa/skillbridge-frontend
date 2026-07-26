export type Contact = {
    id: string;
    name: string;
    email: string;
    image: string | null;

    // null means no conversation exists yet
    conversationId: string | null;
};

export type ContactResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Contact[];
};

export type GetContactsResponse = {
    data: Contact[] | null;
    error: string | null;
};