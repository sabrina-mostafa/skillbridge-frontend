"use client";

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import FormModal from "../common/FormModal";
import { Link2Off, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";


const APP_URL = env.NEXT_PUBLIC_FRONTEND_URL;

export function AccountLinkingSection({ theme }: { theme: string }) {
    const [loading, setLoading] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [isGoogleConnected, setIsGoogleConnected] = useState(false);
    const [hasAlternativeMethod, setHasAlternativeMethod] = useState(false);

    // Manage confirmation modal visibility
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function fetchAccounts() {
            try {
                const { data } = await authClient.listAccounts();

                // Only commit updates to state if the component is still actively mounted
                if (data && isMounted) {
                    const hasGoogle = data.some(acc => acc.providerId === "google");
                    setIsGoogleConnected(hasGoogle);
                    setHasAlternativeMethod(data.length > 1);
                }
            } catch (err) {
                console.error("Failed to fetch accounts", err);
            } finally {
                if (isMounted) {
                    setIsPending(false);
                }
            }
        }
        fetchAccounts();

        // Cleanup function prevents state setting memory leaks or race conditions
        return () => {
            isMounted = false;
        };
    }, []);

    // Helper method to manually re-verify records specifically after actions (like unlinking)
    const refreshAccountsList = async () => {
        try {
            const { data } = await authClient.listAccounts();
            if (data) {
                setIsGoogleConnected(data.some(acc => acc.providerId === "google"));
                setHasAlternativeMethod(data.length > 1);
            }
        } catch (err) {
            console.error("Error refreshing accounts list:", err);
        }
    };

    // Connect Google Flow
    const handleLinkGoogle = async () => {
        setLoading(true);
        try {
            const response = await authClient.linkSocial({
                provider: "google",
                callbackURL: `${APP_URL}/user`,
            });

            if (response?.error) {
                console.error("Linking Error:", response.error);
                toast.error(`Failed to link account: ${response.error.message}`);
            }
        } catch (err) {
            console.error("Unexpected operational error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Disconnect Google Flow (Triggered from Modal)
    const executeDisconnect = async () => {
        setShowConfirmModal(false);
        setLoading(true);
        try {
            const { error } = await authClient.unlinkAccount({
                providerId: "google",
            });

            if (error) {
                console.error("Unlinking Error:", error);
                toast.error(`Failed to disconnect: ${error.message}`);
            } else {
                toast.success("Google account disconnected successfully");
                await refreshAccountsList();
            }
        } catch (err) {
            console.error("Unexpected unlinking error:", err);
            toast.error("An unexpected error occurred while disconnecting.");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <Skeleton className="px-5 py-2.5 w-40 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        );
    }

    return (
        <>
            {isGoogleConnected ? (
                <button
                    onClick={() => {
                        if (!hasAlternativeMethod) {
                            toast.error(
                                "Cannot disconnect. You must keep at least one login method active."
                            );
                            return;
                        }
                        setShowConfirmModal(true);
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-rose-600 cursor-pointer disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Disconnecting...
                        </>
                    ) : (
                        <>
                            <Link2Off className="size-4" />
                            Disconnect Google
                        </>
                    )}
                </button>
            ) : (
                <button
                    onClick={handleLinkGoogle}
                    disabled={loading}
                    className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r ${theme} px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:scale-[1.02] cursor-pointer disabled:opacity-50`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Connecting...
                        </>
                    ) : (
                        <>
                            <FaGoogle className="size-4" />
                            Link Google Account
                        </>
                    )}
                </button>
            )}

            {/* Modern Confirmation Dialog Overlay */}
            <FormModal
                open={showConfirmModal}
                onOpenChange={setShowConfirmModal}
                title="Disconnect Google Account"
                size="sm"
            >
                <div className="space-y-6">
                    <p className="text-sm py-3 text-muted-foreground">
                        Are you sure you want to disconnect your Google account?
                        You will lose the option to log in using Google.
                    </p>

                    <div className="flex border-t pt-4 justify-end gap-3">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="px-4 py-2 border rounded-xl hover:bg-muted cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={executeDisconnect}
                            className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 cursor-pointer"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </FormModal>
        </>
    );
}
