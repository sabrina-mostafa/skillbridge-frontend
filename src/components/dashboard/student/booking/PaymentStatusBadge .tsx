import { PaymentStatus } from "@/constants/booking/PaymentStatus";


type PaymentStatusBadgeProps = {
    status: PaymentStatus;
};

export default function PaymentStatusBadge({
    status,
}: PaymentStatusBadgeProps) {
    const styles = {
        PAID: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        REFUNDED: "bg-orange-100 text-orange-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}