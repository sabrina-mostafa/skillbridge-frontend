"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, StarOff } from "lucide-react";
import { toast } from "sonner";

import FormModal from "@/components/common/FormModal";
import { Button } from "@/components/ui/button";

import { adminClientService } from "@/services/admin/admin.client.service";
import { User } from "@/types/user.type";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";


type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tutor: User | null;
};


export default function ToggleFeaturedDialog({
    open,
    onOpenChange,
    tutor,
}: Props) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [featured, setFeatured] = useState(false);

    if (!tutor) return null;

    function handleUpdate() {
        startTransition(async () => {
            if (!tutor) return;

            const res =
                await adminClientService.updateTutorFeatured(
                    tutor.tutorProfile!.id,
                    featured
                );

            if (res.error) {
                toast.error(res.error.message);
                return;
            }

            toast.success(
                featured
                    ? "Tutor added to featured list."
                    : "Tutor removed from featured list."
            );

            onOpenChange(false);
            router.refresh();
        });
    }


    return (
        <FormModal
            open={open}
            onOpenChange={(nextOpen) => {
                if (nextOpen && tutor) {
                    setFeatured(
                        tutor?.tutorProfile!.isFeatured
                    );
                }
                onOpenChange(nextOpen);
            }}
            title="Update Featured Status"
            size="md"
            footer={
                <>
                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleUpdate}
                        disabled={
                            isPending ||
                            featured === tutor?.tutorProfile?.isFeatured
                        }
                        className="cursor-pointer"
                    >
                        {
                            isPending
                                ?
                                "Updating..."
                                :
                                "Save Changes"
                        }
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Tutor */}
                <div className="rounded-xl border bg-muted/30 p-5">
                    <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                            {tutor.image ? (
                                <div>
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        className="object-cover w-11 h-11"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-primary font-semibold text-primary-foreground">
                                    {tutor.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold">
                                {tutor.name}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {tutor.email}
                            </p>
                        </div>

                        {tutor.tutorProfile?.isFeatured ? (
                            <Badge className="gap-1">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                Featured
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="gap-1">
                                <StarOff className="h-3.5 w-3.5" />
                                Standard
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Setting */}
                <div className="rounded-xl border p-5">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <h4 className="font-medium">
                                Feature Tutor
                            </h4>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Featured tutors receive greater visibility across the
                                homepage and other highlighted sections of the platform.
                            </p>
                        </div>

                        <div>
                            <Switch
                                checked={featured}
                                onCheckedChange={setFeatured}
                            />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                {featured !== tutor.tutorProfile?.isFeatured && (
                    <div
                        className={`rounded-xl border p-4 ${featured
                            ? "border-yellow-500/30 bg-yellow-500/10"
                            : "border-muted bg-muted/40"
                            }`}
                    >
                        <div className="flex gap-3">
                            {featured ? (
                                <Star className="mt-0.5 h-5 w-5 text-yellow-600" />
                            ) : (
                                <StarOff className="mt-0.5 h-5 w-5 text-muted-foreground" />
                            )}

                            <div>
                                <p className="font-medium">
                                    {featured
                                        ? "Tutor will be featured"
                                        : "Tutor will no longer be featured"}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {featured
                                        ? "After saving, this tutor will appear in featured tutor sections throughout the platform."
                                        : "After saving, this tutor will be removed from all featured tutor sections."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormModal>
    );
}