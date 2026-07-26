import { redirect } from "next/navigation";

export default async function UsernamePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    redirect(
        `/user/${username}/profile`
    );
}