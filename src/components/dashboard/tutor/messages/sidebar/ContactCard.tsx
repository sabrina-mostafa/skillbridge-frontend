"use client";

import { cn } from "@/lib/utils";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Contact } from "@/types/contact.type";

type Props = {
    contact: Contact;
    active?: boolean;
    onClick: () => void;
};

export default function ContactCard({
    contact,
    active = false,
    onClick,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            aria-label={`Chat with ${contact.name}`}
            className={cn(
                "w-full cursor-pointer flex items-center gap-3 p-4 text-left transition-colors border-b hover:bg-muted/50",
                active &&
                    "bg-muted border-l-4 border-l-primary"
            )}
        >
            <div className="relative shrink-0">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={contact.image ?? ""}
                        alt={contact.name}
                    />

                    <AvatarFallback>
                        {contact.name
                            .charAt(0)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                {/* We'll replace this with the real online status later */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-gray-400" />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">
                    {contact.name}
                </h3>

                <p className="truncate text-sm text-muted-foreground">
                    {contact.email}
                </p>
            </div>
        </button>
    );
}