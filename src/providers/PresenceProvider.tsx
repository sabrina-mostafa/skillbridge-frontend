"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useSocket } from "./SocketProvider";
import { SOCKET_EVENTS } from "@/constants/message/socketEvents";

const PresenceContext = createContext<Set<string>>(
    new Set()
);

export function PresenceProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const socket = useSocket();

    const [onlineUsers, setOnlineUsers] =
        useState(new Set<string>());

    useEffect(() => {
        socket.on(
            SOCKET_EVENTS.PRESENCE_INIT,
            (users: string[]) => {
                setOnlineUsers(new Set(users));
            }
        );

        socket.on(
            SOCKET_EVENTS.USER_ONLINE,
            ({ userId }: { userId: string }) => {
                setOnlineUsers((prev) => {
                    const next = new Set(prev);
                    next.add(userId);
                    return next;
                });
            }
        );

        socket.on(
            SOCKET_EVENTS.USER_OFFLINE,
            ({ userId }: { userId: string }) => {
                setOnlineUsers((prev) => {
                    const next = new Set(prev);
                    next.delete(userId);
                    return next;
                });
            }
        );

        return () => {
            socket.off(SOCKET_EVENTS.PRESENCE_INIT);
            socket.off(SOCKET_EVENTS.USER_ONLINE);
            socket.off(SOCKET_EVENTS.USER_OFFLINE);
        };
    }, [socket]);

    return (
        <PresenceContext.Provider value={onlineUsers}>
            {children}
        </PresenceContext.Provider>
    );
}

export function usePresence() {
    return useContext(PresenceContext);
}