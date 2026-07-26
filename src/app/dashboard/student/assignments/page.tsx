import UnderConstruction from "@/components/common/UnderConstruction";

export default function Page() {
    return (
        <div>

            <UnderConstruction
                title="Assignments"
                description="The Assignments module is currently under development. Soon you'll be able to view, submit, and track your assignments from this page."
                backHref="/dashboard/student"
                backLabel="Back to Dashboard"
            />
        </div>
    )
}