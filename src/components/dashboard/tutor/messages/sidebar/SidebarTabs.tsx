"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    tab: "chats" | "contacts";
    onChange: (
        tab: "chats" | "contacts"
    ) => void;
};

export default function SidebarTabs({
    tab,
    onChange,
}: Props) {
    return (
        <div className="grid grid-cols-2 gap-2 border-b p-3">
            <Button
                variant={
                    tab === "chats"
                        ? "default"
                        : "ghost"
                }
                className={cn("rounded-md cursor-pointer h-10 border border-gray-300 dark:border-gray-700")}
                onClick={() =>
                    onChange("chats")
                }
            >
                Chats
            </Button>

            <Button
                variant={
                    tab === "contacts"
                        ? "default"
                        : "ghost"
                }
                className={cn("rounded-md cursor-pointer h-10 border border-gray-300 dark:border-gray-700")}
                onClick={() =>
                    onChange("contacts")
                }
            >
                Contacts
            </Button>
        </div>
    );
}