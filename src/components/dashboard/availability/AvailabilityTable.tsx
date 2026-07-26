"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Availability } from "@/types/availability.type";
import TableHeaderSection from "@/components/common/TableHeaderSection";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import AvailabilityEmptyState from "./AvailabilityEmptyState";



type Props = {
  data: Availability[];
  onDelete: (id: string) => void;
  onEdit: (availability: Availability) => void;
};

export default function AvailabilityTable({
  data,
  onDelete,
  onEdit,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="rounded-2xl bg-card shadow-sm border">
      <TableHeaderSection
        title="Your availability"
        description="All your teaching time slots are listed below"
      />

      {/* Table */}
      <div className="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  <AvailabilityEmptyState />
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {item.dayOfWeek}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">{item.startTime}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.endTime}</TableCell>

                  <TableCell className="whitespace-nowrap">
                    {item.slotDuration} min
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={
                        item.isActive ? "default" : "secondary"
                      }
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onEdit(item)}
                      >
                        <div className="flex gap-2 justify-center items-center">
                          <Pencil className="h-4 w-4 text-primary" />
                          <p className="underline">Edit</p>
                        </div>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer text-red-500 hover:text-red-600"
                        onClick={() => {
                          setSelectedId(item.id);
                          setDeleteOpen(true);
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          <p>Delete</p>
                        </div>
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Availability"
        description="Are you sure you want to delete this availability slot? This action cannot be undone."
        onConfirm={() => {
          if (!selectedId) return;

          onDelete(selectedId);

          setDeleteOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}