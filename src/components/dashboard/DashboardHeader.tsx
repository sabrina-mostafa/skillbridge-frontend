
import { User } from "@/types/user.type";
import UserDropdown from "../layout/UserDropdown";
import { ModeToggle } from "../layout/ModeToggle";

export default function DashboardHeader({
  user,
}: {
  user: User;
}) {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">

      <div>
        <h1 className="font-semibold text-lg">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserDropdown user={user} />
      </div>



    </header>
  );
}