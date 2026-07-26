"use client";

import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Availability, CreateAvailabilityPayload, DayOfWeek, DAYS } from "@/types/availability.type";
import { availabilitySchema } from "@/schemas/availability.schema";
import { availabilityClientService } from "@/services/availability/availability.client.service";




type AvailabilityFormProps = {
  editingAvailability?: Availability | null;
  onSuccess?: (availability: Availability) => void;
  onCancel: () => void;
};

export default function AvailabilityForm({
  editingAvailability,
  onSuccess,
  onCancel,
}: AvailabilityFormProps) {
  const defaultValues: CreateAvailabilityPayload =
    editingAvailability
      ? {
        dayOfWeek: editingAvailability.dayOfWeek,
        startTime: editingAvailability.startTime,
        endTime: editingAvailability.endTime,
        slotDuration: editingAvailability.slotDuration,
      }
      : {
        dayOfWeek: DAYS[0],
        startTime: "09:00",
        endTime: "10:00",
        slotDuration: 30,
      };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: availabilitySchema,
    },
    onSubmit: async ({ value }) => {
      let res;
      if (editingAvailability) {
        res = await availabilityClientService.updateAvailability(editingAvailability.id, value);
      }
      else {
        res = await availabilityClientService.createAvailability(value);
      }

      if (res.error) {
        toast.error(res.error);
        return;
      }

      if (!res.data) {
        toast.error("Failed to create availability");
        return;
      }

      onSuccess?.(res.data);
      toast.success(
        editingAvailability
          ? "Availability updated"
          : "Availability created"
      );
      form.reset();
    },
  });

  return (
    <div>
      <form
        id="availability-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full lg:space-y-4 space-y-3">
              {/* DAY */}
              <form.Field name="dayOfWeek">
                {(field) => (
                  <Field>
                    <FieldLabel>Day</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as DayOfWeek)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* DURATION */}
              <form.Field name="slotDuration">
                {(field) => (
                  <Field>
                    <FieldLabel>Slot Duration</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      onValueChange={(v) => field.handleChange(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              </form.Field>
            </div>

            <div className="w-full lg:space-y-4 space-y-3">
              {/* START */}
              <form.Field name="startTime">
                {(field) => (
                  <Field>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* END */}
              <form.Field name="endTime">
                {(field) => (
                  <Field>
                    <FieldLabel>End Time</FieldLabel>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              </form.Field>
            </div>
          </div>
        </FieldGroup>
      </form>
      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
        ]}
      >
        {([canSubmit, isSubmitting]) => (

          <div className="mt-6 flex justify-end gap-3 border-t pt-4">

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              form="availability-form"
              type="submit"
              className="cursor-pointer"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : editingAvailability
                  ? "Update Availability"
                  : "Save Availability"}
            </Button>

          </div>

        )}
      </form.Subscribe>
    </div>
  );
}
