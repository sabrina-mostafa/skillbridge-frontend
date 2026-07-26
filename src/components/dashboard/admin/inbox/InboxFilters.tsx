"use client";

import {
  ArrowUpDown,
  RotateCcw,
  Search,
  Users,
  Tags,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  userType: string;
  inquiryType: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onInquiryTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function InboxFilters({
  search,
  userType,
  inquiryType,
  sortBy,
  onSearchChange,
  onUserTypeChange,
  onInquiryTypeChange,
  onSortChange,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative w-full xl:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            placeholder="Search by name, email, phone or message..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* User Type */}
          <Select
            value={userType}
            onValueChange={onUserTypeChange}
          >
            <SelectTrigger className="w-[170px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Users
              </SelectItem>

              <SelectItem value="STUDENT">
                Student
              </SelectItem>

              <SelectItem value="TUTOR">
                Tutor
              </SelectItem>

              <SelectItem value="PARENT">
                Parent
              </SelectItem>

              <SelectItem value="OTHER">
                Other
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Inquiry Type */}
          <Select
            value={inquiryType}
            onValueChange={onInquiryTypeChange}
          >
            <SelectTrigger className="w-[210px]">
              <Tags className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Inquiries
              </SelectItem>

              <SelectItem value="Booking Support">
                Booking Support
              </SelectItem>

              <SelectItem value="Tutor Registration">
                Tutor Registration
              </SelectItem>

              <SelectItem value="Student Account">
                Student Account
              </SelectItem>

              <SelectItem value="Payment Issue">
                Payment Issue
              </SelectItem>

              <SelectItem value="Technical Problem">
                Technical Problem
              </SelectItem>

              <SelectItem value="General Inquiry">
                General Inquiry
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={sortBy}
            onValueChange={onSortChange}
          >
            <SelectTrigger className="w-[170px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">
                Newest First
              </SelectItem>

              <SelectItem value="oldest">
                Oldest First
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={onReset}
            className="cursor-pointer"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}