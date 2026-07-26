"use client";

import { useState } from "react";

import { User } from "@/types/user.type";
import { SelectedChat } from "@/types/conversation.type";
import SidebarTabs from "./SidebarTabs";
import SidebarSearch from "./SidebarSearch";
import ConversationList from "./ConversationList";
import ContactList from "./ContactList";


type Props = {
    currentUser: User;
    selectedChat: SelectedChat | null;
    onSelectChat: (chat: SelectedChat) => void;
};

export default function Sidebar({
    currentUser,
    selectedChat,
    onSelectChat,
}: Props) {
    const [tab, setTab] = useState<
        "chats" | "contacts"
    >("chats");

    const [search, setSearch] =
        useState("");

    return (
        <aside className="w-full lg:w-96 h-full border-r bg-background flex flex-col">
            <SidebarTabs
                tab={tab}
                onChange={setTab}
            />

            <SidebarSearch
                value={search}
                onChange={setSearch}
            />

            <div className="flex-1 overflow-y-auto">
                {tab === "chats" ? (
                    <ConversationList
                        currentUser={currentUser}
                        selectedChat={selectedChat}
                        onSelectChat={onSelectChat}
                        search={search}
                    />
                ) : (
                    <ContactList
                        currentUser={currentUser}
                        selectedChat={selectedChat}
                        onSelectChat={onSelectChat}
                        search={search}
                    />
                )}
            </div>
        </aside>
    );
}