export const SOCKET_EVENTS = {
    // Connection
    CONNECTION: "connection",
    DISCONNECT: "disconnect",

    // Messages
    MESSAGE_NEW: "message:new",
    MESSAGE_READ: "message:read",

    // Conversations
    CONVERSATION_UPDATED: "conversation:updated",
    CONVERSATION_READ: "conversation:read",

    // Typing
    TYPING_START: "typing:start",
    TYPING_STOP: "typing:stop",

    // Rooms
    CONVERSATION_JOIN: "conversation:join",
    CONVERSATION_LEAVE: "conversation:leave",

    // Presence
    USER_ONLINE: "user:online",
    USER_OFFLINE: "user:offline",

    PRESENCE_INIT: "presence:init",
} as const;

export type SocketEvent =
    (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];