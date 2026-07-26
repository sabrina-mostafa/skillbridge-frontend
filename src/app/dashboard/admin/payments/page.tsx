import SectionHeader from "@/components/common/SectionHeader";
import PaymentsUnderConstruction from "@/components/dashboard/admin/PaymentsUnderConstruction";


export default function PaymentsPage() {
    return (
        <div className="space-y-8">
            <SectionHeader
                title="Payments"
                description="Manage platform payments and financial transactions."
            />

            <PaymentsUnderConstruction />
        </div>
    );
}