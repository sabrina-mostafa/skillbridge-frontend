"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { conversationClientService } from "@/services/message/conversation.client.service";

import { User } from "@/types/user.type";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import { messageClientService } from "@/services/message/message.client.service";
import { Message } from "@/types/message.type";
import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import MessageInput from "./MessageInput";
import { SOCKET_EVENTS } from "@/constants/message/socketEvents";
import EmptyChat from "./EmptyChat";
import ChatSkeleton from "../../../../skeletons/ChatSkeleton";
import ChatError from "./ChatError";
import { SelectedChat } from "@/types/conversation.type";


type Props = {
  selectedChat: SelectedChat | null;
  currentUser: User;
  onConversationCreated: (
    conversationId: string
  ) => void;

  onBack: () => void;
};

export default function ChatWindow({
  selectedChat,
  currentUser,
  onConversationCreated,
  onBack,
}: Props) {

  const conversationId = selectedChat?.conversationId ?? null;
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversation", conversationId],
    enabled: !!conversationId,
    queryFn: async () => {
      const result =
        await conversationClientService.getById(
          conversationId!
        );

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });

  const socket = useSocket();
  const queryClient = useQueryClient();

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const result =
        await conversationClientService.createConversation({
          participantId:
            selectedChat!.participantId,
        });

      if (result.error || !result.data) {
        throw new Error(
          result.error ?? "Failed to create conversation"
        );
      }
      return result.data;
    },
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      queryClient.setQueryData(
        ["conversation", conversation.id],
        conversation
      );

      onConversationCreated(conversation.id);
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => {
      const result = await messageClientService.sendMessage(
        conversationId,
        { content }
      );

      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },

    onMutate: async ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousMessages =
        queryClient.getQueryData<Message[]>([
          "messages",
          conversationId,
        ]);

      const optimisticMessage: Message & {
        optimistic?: boolean;
      } = {
        id: `temp-${Date.now()}`,
        conversationId: conversationId!,
        senderId: currentUser.id,
        content,
        isRead: false,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        optimistic: true,

        sender: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
        },
      };

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (old = []) => [...old, optimisticMessage]
      );

      return {
        previousMessages,
        optimisticId: optimisticMessage.id,
      };
    },

    onError: (_error, _content, context) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        context?.previousMessages
      );
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async () => {

      if (!conversationId) {
        return;
      }
      const result =
        await conversationClientService.markConversationRead(
          conversationId
        );

      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });

  useEffect(() => {
    if (!conversationId) {
      return;
    }
    markReadMutation.mutate();
  }, [conversationId]);


  // AFTER hooks

  if (!selectedChat) {
    return <EmptyChat />;
  }

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (error) {
    return (
      <ChatError
        message={
          error instanceof Error
            ? error.message
            : undefined
        }
        onRetry={() =>
          queryClient.invalidateQueries({
            queryKey: ["conversation", conversationId],
          })
        }
      />
    );
  }


  return (
    <div className="flex h-full flex-1 flex-col">
      <ChatHeader
        conversation={data}
        selectedChat={selectedChat}
        currentUser={currentUser}
        onBack={onBack}
      />

      {conversationId ? (
        <MessageList
          conversationId={conversationId}
          currentUser={currentUser}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No messages yet. Start the conversation below.
        </div>
      )}

      <MessageInput
        onSend={async (content: string) => {
          let currentConversationId = conversationId;

          if (!currentConversationId) {
            const conversation =
              await createConversationMutation.mutateAsync();

            currentConversationId = conversation.id;
          }

          await sendMessageMutation.mutateAsync({
            conversationId: currentConversationId,
            content,
          });

          queryClient.invalidateQueries({
            queryKey: ["conversations"],
          });
        }}

        onTypingStart={() => {
          if (!conversationId) return;

          socket.emit(
            SOCKET_EVENTS.TYPING_START,
            conversationId
          );
        }}

        onTypingStop={() => {
          if (!conversationId) return;

          socket.emit(
            SOCKET_EVENTS.TYPING_STOP,
            conversationId
          );
        }}
      />
    </div>
  );
}