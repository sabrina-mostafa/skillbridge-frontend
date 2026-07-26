"use server"

import { contactService } from "@/services/contact.service"
import { ContactFormData } from "@/types/public-contact-form.type";


export const createContactMessage = async (data: ContactFormData) => {
    const res = await contactService.submitContactForm(data);
    return res;
}