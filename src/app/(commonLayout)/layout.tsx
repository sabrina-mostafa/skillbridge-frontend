import FooterSwitcher from "@/components/common/FooterSwitcher";
import Navbar from "@/components/layout/Navbar";
import { userServerService } from "@/services/user/user.server.service";
import { User } from "@/types/user.type";


export default async function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await userServerService.getSession();
    const user: User = session?.data?.user;
    
    return (
        <>
            <Navbar user={user} />
            <div>
                {children}
            </div>

            <FooterSwitcher />
        </>
    );
}