import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({

    server: {
        BACKEND_URL: z.string().url(),
        FRONTEND_URL: z.string().url(),
        API_URL: z.string().url(),
        AUTH_URL: z.string().url(),
    },

    client: {
        NEXT_PUBLIC_BACKEND_URL: z.string().url(),
        NEXT_PUBLIC_FRONTEND_URL: z.string().url(),
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
    },

    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,

        NEXT_PUBLIC_BACKEND_URL:
            process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_FRONTEND_URL:
            process.env.NEXT_PUBLIC_FRONTEND_URL,
        NEXT_PUBLIC_API_URL:
            process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    },
});