"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/common/FormModal";
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityTable from "./AvailabilityTable";
import { Availability } from "@/types/availability.type";
import { availabilityClientService } from "@/services/availability/availability.client.service";


export default function AvailabilityManager() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [editingAvailability, setEditingAvailability] =
        useState<Availability | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result =
                    await availabilityClientService.getMine();

                if (result.error) {
                    toast.error(result.error);
                    return;
                }

                setAvailabilities(result.data);
            } catch {
                toast.error("Failed to fetch availability");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleDelete = async (id: string) => {
        const res =
            await availabilityClientService.delete(id);

        if (res.error) {
            toast.error(res.error);

            return;
        }

        setAvailabilities((prev) =>
            prev.filter((item) => item.id !== id)
        );

        toast.success("Availability deleted");
    };

    const handleSuccess = (
        saved: Availability
    ) => {
        if (editingAvailability) {
            setAvailabilities((prev) =>
                prev.map((item) =>
                    item.id === saved.id ? saved : item
                )
            );
        } else {
            setAvailabilities((prev) => [
                saved,
                ...prev,
            ]);
        }

        setEditingAvailability(null);

        setOpen(false);
    };

    const handleAdd = () => {
        setEditingAvailability(null);

        setOpen(true);
    };

    const handleEdit = (
        availability: Availability
    ) => {
        setEditingAvailability(availability);

        setOpen(true);
    };

    if (loading) {
        return (
            <div className="text-muted-foreground">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-card shadow-sm">
                <div className="border-b px-5 py-4">
                    <h2 className="font-medium">Add new slot</h2>
                    <p className="text-xs text-muted-foreground">
                        Create availability for students to book
                    </p>
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={handleAdd}
                        className="cursor-pointer"
                    >
                        Add Availability
                    </Button>
                </div>
            </div>


            <AvailabilityTable
                data={availabilities}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <FormModal
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);

                    if (!v) {
                        setEditingAvailability(null);
                    }
                }}
                title={
                    editingAvailability
                        ? "Edit Availability"
                        : "Add Availability"
                }
            >
                <AvailabilityForm
                    editingAvailability={
                        editingAvailability
                    }
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setOpen(false);

                        setEditingAvailability(null);
                    }}
                />
            </FormModal>
        </div>
    );
}