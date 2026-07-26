import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";


export const contactSchema = z.object({
    fullName: z.string().min(2, "Name is required"),

    email: z.string().email("Invalid email address"),

    phone: z.string().refine(
        (value) =>
            value === "" || isValidPhoneNumber(value),
        {
            message: "Invalid phone number",
        }
    ),

    userType: z.string(),

    inquiryType: z
        .array(z.string())
        .min(1, "Select at least one inquiry type"),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters"),
});