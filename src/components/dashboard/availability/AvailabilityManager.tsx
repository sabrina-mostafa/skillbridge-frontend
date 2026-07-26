"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

import FormModal from "@/components/common/FormModal";
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityTable from "./AvailabilityTable";

import { Availability } from "@/types/availability.type";
import { availabilityClientService } from "@/services/availability/availability.client.service";
import SectionHeader from "@/components/common/SectionHeader";
import AvailabilityManagerSkeleton from "@/components/skeletons/AvailabilityManagerSkeleton";



export default function AvailabilityManager() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Availability | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await availabilityClientService.getMine();

                if (res.error) {
                    toast.error(res.error);
                    return;
                }

                setAvailabilities(res.data);
            } catch {
                toast.error("Failed to load availability");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id: string) => {
        const res = await availabilityClientService.delete(id);

        if (res.error) return toast.error(res.error);

        setAvailabilities((prev) =>
            prev.filter((x) => x.id !== id)
        );

        toast.success("Deleted successfully");
    };

    const handleSuccess = (saved: Availability) => {
        setAvailabilities((prev) => {
            if (editing) {
                return prev.map((x) =>
                    x.id === saved.id ? saved : x
                );
            }
            return [saved, ...prev];
        });

        setEditing(null);
        setOpen(false);
    };

    if (loading) {
        return <AvailabilityManagerSkeleton />;
    }

    return (
        <div className="space-y-10 w-full flex flex-col">
            {/* Header Card */}
            <SectionHeader
                title="Manage Availability"
                description="Create and manage your weekly teaching schedule"
                action={
                    <Button
                        className="w-full sm:w-auto cursor-pointer"
                        onClick={() => {
                            setEditing(null);
                            setOpen(true);
                        }}
                    >
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Add Availability
                    </Button>
                }
            />

            {/* Table */}
            <AvailabilityTable
                data={availabilities}
                onDelete={handleDelete}
                onEdit={(item) => {
                    setEditing(item);
                    setOpen(true);
                }}
            />

            {/* Modal */}
            <FormModal
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) setEditing(null);
                }}
                title={editing ? "Edit Availability" : "Add Availability"}
                size="lg"
            >
                <AvailabilityForm
                    editingAvailability={editing}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setOpen(false);
                        setEditing(null);
                    }}
                />
            </FormModal>
        </div>
    );
}