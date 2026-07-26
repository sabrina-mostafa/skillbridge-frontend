import { User } from "./user.type";

export type Message = {
  id: string;

  conversationId: string;

  senderId: string;
  sender: Pick<User, "id" | "name" | "email" | "image">;

  content: string;

  isRead: boolean;

  createdAt: string;
  updatedAt: string;
};

export type MessageResponse = Message[];

export type SendMessagePayload = {
  content: string;
};