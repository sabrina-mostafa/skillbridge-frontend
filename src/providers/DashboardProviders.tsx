"use client";

import { PresenceProvider } from "./PresenceProvider";
import QueryProvider from "./QueryProvider";
import { SocketProvider } from "./SocketProvider";

export default function DashboardProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <SocketProvider>
                <PresenceProvider>
                    {children}
                </PresenceProvider>
            </SocketProvider>
        </QueryProvider>
    );
}