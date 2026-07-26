import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/constants/user/UserStatus";

type Props = {
    status: UserStatus;
};

export default function UserStatusBadge({ status }: Props) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                    Active
                </Badge>
            );

        case "BLOCKED":
            return (
                <Badge
                    variant="destructive"
                    className="border-red-200 bg-red-100 text-red-700 hover:bg-red-100"
                >
                    Blocked
                </Badge>
            );

        default:
            return (
                <Badge variant="secondary">
                    {status}
                </Badge>
            );
    }
}