import { Message } from "./message.type";

export type MessageNewEvent = Message;

export type MessageReadEvent = {
    messageId: string;

    conversationId: string;

    readBy: string;

    readAt: string;
};

export type ConversationUpdatedEvent = {
    conversationId: string;

    lastMessage?: Message;

    unreadIncrement?: number;

    unreadReset?: boolean;
};

export type TypingEvent = {
    conversationId: string;

    userId: string;
};

export type PresenceEvent = {
    userId: string;

    online: boolean;
};