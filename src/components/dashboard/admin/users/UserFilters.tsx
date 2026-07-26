"use client";

import { Search, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type Props = {
    search: string;
    role: string;
    status: string;
    sortBy: string;

    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
};

export default function UserFilters({
    search,
    role,
    status,
    sortBy,
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onSortChange,
    onReset,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-5">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">

                {/* Search */}
                <div className="relative sm:col-span-2 xl:col-span-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Role */}
                <Select
                    value={role}
                    onValueChange={onRoleChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Roles</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="TUTOR">Tutor</SelectItem>
                        <SelectItem value="STUDENT">Student</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                    value={sortBy}
                    onValueChange={onSortChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset */}
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="w-full xl:w-auto gap-2 cursor-pointer"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>

            </div>
        </div>
    );
}