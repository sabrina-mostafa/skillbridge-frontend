"use client";

import { FormEvent, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    onSend: (content: string) => Promise<void>;
    onTypingStart: () => void;
    onTypingStop: () => void;
};

export default function MessageInput({
    onSend,
    onTypingStart,
    onTypingStop
}: Props) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const content = message.trim();

        if (!content) return;

        try {
            setSending(true);

            await onSend(content);

            setMessage("");
        } finally {
            setSending(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t p-4"
        >
            <div className="flex items-center gap-3">
                <Textarea
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);

                        onTypingStart();

                        if (typingTimeout.current) {
                            clearTimeout(typingTimeout.current);
                        }
                        typingTimeout.current = setTimeout(() => {
                            onTypingStop();
                        }, 1000);
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="min-h-12 resize-none"
                />

                <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={
                        sending ||
                        message.trim().length === 0
                    }
                    size="icon"
                >
                    <SendHorizontal className="h-5 w-5" />
                </Button>
            </div>
        </form>
    );
}