"use client";

import { useState } from "react";

import { User } from "@/types/user.type";
import { SelectedChat } from "@/types/conversation.type";

import Sidebar from "./sidebar/Sidebar";
import ChatWindow from "./chat/ChatWindow";

type Props = {
    currentUser: User;
};

export default function ConversationClient({
    currentUser,
}: Props) {
    const [selectedChat, setSelectedChat] =
        useState<SelectedChat | null>(null);

    return (
        <div className="flex h-full overflow-hidden rounded-lg border bg-background">

            {/* Sidebar */}
            <div
                className={`
                    w-full lg:block lg:w-96
                    ${selectedChat ? "hidden" : "block"}
                `}
            >
                <Sidebar
                    currentUser={currentUser}
                    selectedChat={selectedChat}
                    onSelectChat={setSelectedChat}
                />
            </div>

            {/* Chat */}
            <div
                className={`
                    w-full flex-1
                    ${selectedChat ? "block" : "hidden"}
                    lg:block
                `}
            >
                <ChatWindow
                    selectedChat={selectedChat}
                    currentUser={currentUser}
                    onConversationCreated={(conversationId) => {
                        setSelectedChat((prev) =>
                            prev
                                ? {
                                      ...prev,
                                      conversationId,
                                  }
                                : prev
                        );
                    }}
                    onBack={() =>
                        setSelectedChat(null)
                    }
                />
            </div>
        </div>
    );
}