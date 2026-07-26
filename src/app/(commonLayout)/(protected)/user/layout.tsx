import { ReactNode } from "react";


export default async function UserRootLayout({
    children,
}: {
    children: ReactNode;
}) {

    return (
        <div className="min-h-screen flex">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}