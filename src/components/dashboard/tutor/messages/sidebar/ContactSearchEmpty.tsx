"use client";

import { UserRoundSearch } from "lucide-react";


type Props = {
    search: string;
};

export default function ContactSearchEmpty({
    search,
}: Props) {
    return (
        <div className="h-full flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-5 rounded-full bg-muted p-4">
                <UserRoundSearch className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-lg font-semibold">
                No contacts found
            </h2>

            <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
                No contacts match{" "}
                <span className="font-medium text-foreground">
                    &ldquo;{search}&rdquo;
                </span>
                . Try searching with a different name.
            </p>
        </div>
    );
}