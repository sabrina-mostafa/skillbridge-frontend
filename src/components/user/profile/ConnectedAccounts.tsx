"use client";

import { Button } from "@/components/ui/button";

type Props = {
    googleConnected: boolean;
};

export default function ConnectedAccounts({
    googleConnected,
}: Props) {
    const handleGoogleConnect = async () => {
        // Better Auth link flow
    };

    return (
        <div className="rounded-3xl border bg-card p-8">
            <h2 className="text-xl font-semibold">
                Connected Accounts
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
                Manage your sign in providers.
            </p>

            <div className="mt-6 flex items-center justify-between">
                <div>
                    <p className="font-medium">
                        Google
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {googleConnected
                            ? "Connected"
                            : "Not Connected"}
                    </p>
                </div>

                <Button
                    variant={
                        googleConnected
                            ? "outline"
                            : "default"
                    }
                    onClick={handleGoogleConnect}
                >
                    {googleConnected
                        ? "Disconnect"
                        : "Connect Google"}
                </Button>
            </div>
        </div>
    );
}