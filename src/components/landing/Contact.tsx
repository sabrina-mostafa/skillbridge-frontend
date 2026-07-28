"use client";

import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Textarea } from "@/components/ui/textarea";
import contactImage from "../../../public/landing/contact2.jpeg";
import { contactSchema } from "@/schemas/public-contactMessage.schema";
import { ContactFormData } from "@/types/public-contact-form.type";
import { contactService } from "@/services/contact.service";



export default function Contact() {
  const defaultValues: ContactFormData = {
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    inquiryType: [],
    message: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending...");

      try {
        const res = await contactService.submitContactForm(value);

        if (res.error) {
          toast.error(res.error.message, {
            id: toastId,
          });
          return;
        }

        toast.success("Message sent successfully!", {
          description:
            "We'll get back to you as soon as possible.",
          id: toastId,
        });

        form.reset();
      } catch {
        toast.error("Something went wrong.", {
          id: toastId,
        });
      }
    },
  });


  return (
    <section  id="contact" className="py-18 md:py-24 px-6 bg-background">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
          Get In Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Have Questions?{" "}
          <span className="text-primary">Let&apos;s Talk</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-135 mx-auto text-[15px] leading-relaxed">
          We&apos;re here to help you on your learning journey. Reach out and
          we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      {/* Combined Card */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-slate-200 dark:border-indigo-600 rounded-3xl shadow-xl overflow-hidden">

          {/* LEFT: Image */}
          <div className="relative h-75 lg:h-full">
            <Image
              src={contactImage}
              alt="Mentorship"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* RIGHT: Form */}
          <div className="p-6 md:p-8 bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>

                {/* Personal Information */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Personal Information
                  </h3>

                  <div className="flex flex-col md:flex-row gap-5">
                    <form.Field name="fullName">
                      {(field) => (
                        <Field>
                          <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Full Name
                          </FieldLabel>

                          <Input
                            placeholder="John Doe"
                            className="h-8 rounded-lg bg-muted/40 border-border"
                            value={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            onBlur={field.handleBlur}
                          />

                          <FieldError errors={field.state.meta.errors} />
                        </Field>
                      )}
                    </form.Field>

                    <form.Field name="email">
                      {(field) => (
                        <Field>
                          <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Email Address
                          </FieldLabel>

                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="h-8 rounded-lg bg-muted/40 border-border"
                            value={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            onBlur={field.handleBlur}
                          />

                          <FieldError errors={field.state.meta.errors} />
                        </Field>
                      )}
                    </form.Field>
                  </div>
                </div>

                <div className="border-t" />

                {/* Contact Details */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Contact Details
                  </h3>

                  <div className="flex flex-col md:flex-row gap-5">
                    <form.Field name="phone">
                      {(field) => (
                        <Field>
                          <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Phone Number
                          </FieldLabel>

                          <PhoneInput
                            international
                            defaultCountry="BD"
                            value={field.state.value}
                            onChange={(value) =>
                              field.handleChange(value ?? "")
                            }
                            className="rounded-lg border bg-muted/40 px-3 h-8"
                          />
                          <FieldError errors={field.state.meta.errors} />
                        </Field>
                      )}
                    </form.Field>

                    <form.Field name="userType">
                      {(field) => (
                        <Field>
                          <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            I am a
                          </FieldLabel>

                          <Select
                            value={field.state.value}
                            onValueChange={field.handleChange}
                          >
                            <SelectTrigger className="h-8 rounded-lg bg-muted/40">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>

                            <SelectContent>
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

                          <FieldError errors={field.state.meta.errors} />
                        </Field>
                      )}
                    </form.Field>
                  </div>

                </div>

                <div className="border-t" />

                {/* Inquiry */}
                <form.Field name="inquiryType">
                  {(field) => (
                    <Field>
                      <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Inquiry Type
                      </FieldLabel>

                      <div className="flex flex-wrap gap-2">
                        {[
                          "Booking Support",
                          "Tutor Registration",
                          "Student Account",
                          "Payment Issue",
                          "Technical Problem",
                          "General Inquiry",
                        ].map((item) => {

                          const selected = field.state.value.includes(item);

                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                field.handleChange(
                                  selected
                                    ? field.state.value.filter(
                                      (v) => v !== item
                                    )
                                    : [...field.state.value, item]
                                );
                              }}
                              className={`cursor-pointer rounded-xl border px-2 py-1 text-sm font-medium transition-all duration-200 ${selected
                                ? "border-primary bg-primary text-white shadow-md"
                                : "border-border bg-card hover:border-primary hover:bg-primary/5"
                                }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Message */}
                <form.Field name="message">
                  {(field) => (
                    <Field>
                      <div className="flex items-center justify-between">
                        <FieldLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Message
                        </FieldLabel>
                        <span className="text-xs text-muted-foreground">
                          {field.state.value.length}/1000
                        </span>
                      </div>

                      <Textarea
                        placeholder="Describe your question or issue in detail..."
                        className="h-20 p-4 resize-none rounded-lg bg-muted/40"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        onBlur={field.handleBlur}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Submit */}
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                  ]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="h-11 w-full cursor-pointer rounded-lg text-base font-semibold shadow-lg"
                    >
                      <Send className="mr-2 h-5 w-5" />

                      {isSubmitting
                        ? "Sending Message..."
                        : "Send Message"}
                    </Button>
                  )}
                </form.Subscribe>

              </FieldGroup>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}