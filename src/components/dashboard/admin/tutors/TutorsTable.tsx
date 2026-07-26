"use client";

import Image from "next/image";
import { Award, Eye, ShieldCheck, ShieldX, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserStatusBadge from "../UserStatusBadge";
import { User } from "@/types/user.type";

type Props = {
    tutors: User[];

    onViewDetails: (tutor: User) => void;
    onViewProfile: (tutor: User) => void;
    onToggleStatus: (tutor: User) => void;
    onToggleFeatured: (tutor: User) => void;
};

export default function TutorsTable({
    tutors,
    onViewDetails,
    onViewProfile,
    onToggleStatus,
    onToggleFeatured,
}: Props) {
    if (!tutors.length) {
        return (
            <EmptyState
                title="No tutors found"
                description="No tutors match the selected filters."
            />
        );
    }


    return (
        <div className="rounded-2xl p-2 border bg-card overflow-hidden">
            <Table className="min-w-245">
                <TableHeader>
                    <TableRow>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Categories</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right pr-4">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tutors.map((tutor) => (
                        (tutor.profileCompleted &&
                            <TableRow key={tutor.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={
                                                tutor.image ||
                                                "/images/default-avatar.png"
                                            }
                                            alt={tutor.name}
                                            width={44}
                                            height={44}
                                            className="rounded-full h-11 w-11 object-cover"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {tutor.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {tutor.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {tutor?.tutorProfile?.categories
                                            .slice(0, 2)
                                            .map((item) => (
                                                <Badge
                                                    key={item?.category?.id}
                                                    variant="secondary"
                                                >
                                                    {item?.category?.name}
                                                </Badge>
                                            ))}

                                        {(tutor?.tutorProfile?.categories.length ?? 0) > 2 && (
                                            <Badge variant="outline">
                                                +
                                                {(tutor?.tutorProfile?.categories.length ?? 0) - 2}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    ৳{tutor?.tutorProfile?.hourlyRate}/hr
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                                        <span>
                                            {tutor?.tutorProfile?.avgRating.toFixed(1)}
                                        </span>

                                        <span className="text-muted-foreground">
                                            ({tutor?.tutorProfile?.totalReviews})
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <UserStatusBadge
                                        status={tutor.status}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            tutor?.tutorProfile?.isFeatured
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {tutor?.tutorProfile?.isFeatured
                                            ? "Featured"
                                            : "Normal"}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() =>
                                                onViewDetails(tutor)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                onViewProfile(tutor)
                                            }
                                        >
                                            Profile
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() =>
                                                onToggleStatus(tutor)
                                            }
                                            className="cursor-pointer"
                                        >
                                            {tutor.status ===
                                                "ACTIVE" ? (
                                                <ShieldX className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                            )}
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant={
                                                tutor?.tutorProfile?.isFeatured
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                onToggleFeatured(
                                                    tutor
                                                )
                                            }
                                            className={`cursor-pointer ${tutor?.tutorProfile?.isFeatured ? "bg-primary" : ""
                                                }`}                                    >
                                            <Award
                                                className={`h-4 w-4 ${tutor?.tutorProfile?.isFeatured
                                                    ? "fill"
                                                    : ""
                                                    }`}
                                            />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>)
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}