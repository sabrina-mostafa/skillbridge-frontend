import { User } from "./user.type";
import { Message } from "./message.type";

export type ConversationParticipant = {
    id: string;

    conversationId: string;

    userId: string;

    joinedAt: string;

    user: Pick<User, "id" | "name" | "email" | "image">;
};

export type Conversation = {
    id: string;

    lastMessageAt: string | null;

    participants: ConversationParticipant[];

    messages: Message[];

    unreadCount: number;

    createdAt: string;
    updatedAt: string;
};

export type ConversationResponse = {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    data: Conversation[];
};

export type CreateConversationPayload = {
    participantId: string;
};


export type SelectedChat = {
    participantId: string;
    participantName: string;
    participantImage: string | null;

    conversationId: string | null;
};