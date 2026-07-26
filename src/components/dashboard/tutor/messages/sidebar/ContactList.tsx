"use client";

import { useMemo } from "react";
import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { conversationClientService } from "@/services/message/conversation.client.service";

import { User } from "@/types/user.type";
import {
    SelectedChat,
} from "@/types/conversation.type";
import ContactCard from "./ContactCard";
import ConversationSidebarSkeleton from "@/components/skeletons/ConversationSidebarSkeleton";
import ConversationSidebarError from "./ConversationSidebarError";
import { Contact } from "@/types/contact.type";
import ContactSearchEmpty from "./ContactSearchEmpty";
import ContactListEmpty from "./ContactListEmpty";


type Props = {
    currentUser: User;
    selectedChat: SelectedChat | null;
    onSelectChat: (
        chat: SelectedChat
    ) => void;
    search: string;
};

export default function ContactList({
    selectedChat,
    onSelectChat,
    search,
}: Props) {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const result =
                await conversationClientService.getContacts();

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
    });

    const filteredContacts = useMemo(() => {
        if (!data) return [];

        return data
            .filter((contact) => !contact.conversationId)
            .filter((contact) =>
                contact.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
    }, [data, search]);

    if (isLoading) {
        return <ConversationSidebarSkeleton />;
    }

    if (error) {
        return (
            <ConversationSidebarError
                message={(error as Error).message}
                onRetry={() =>
                    queryClient.invalidateQueries({
                        queryKey: ["contacts"],
                    })
                }
            />
        );
    }

    if (search==="" && !filteredContacts.length) {
        return <ContactListEmpty />;
    }

    if (!filteredContacts.length) {
        return (
            <ContactSearchEmpty
                search={search}
            />

        );
    }

    return (
        <div className="divide-y">
            {filteredContacts.map(
                (contact: Contact) => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        active={
                            selectedChat
                                ?.participantId ===
                            contact.id
                        }
                        onClick={() =>
                            onSelectChat({
                                conversationId:
                                    contact.conversationId,
                                participantId:
                                    contact.id,
                                participantName:
                                    contact.name,
                                participantImage:
                                    contact.image,
                            })
                        }
                    />
                )
            )}
        </div>
    );
}