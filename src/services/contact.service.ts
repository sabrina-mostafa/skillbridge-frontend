// import { env } from "@/env"
import { ContactFormData } from "@/types/public-contact-form.type";


// const API_URL = env.API_URL;
const API_URL = "/api";


export const contactService = {

    submitContactForm: async function (payload: ContactFormData) {
        try {
            const res = await fetch(`${API_URL}/admin/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: result?.message || "Failed to submit form",
                };
            }

            return { data: result, error: null }

        } catch (error ) {
            return { data: null, error: { message: "Something went wrong" } }

        }
    }
}