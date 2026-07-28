import { env } from "@/env";



const CLOUD_NAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;


export const uploadService = {

    uploadImage: async (file: File) => {

        // console.log({
        //     CLOUD_NAME,
        //     UPLOAD_PRESET,
        // });

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        formData.append(
            "upload_preset",
            UPLOAD_PRESET
        );

        const res = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();

        if (!res.ok) {

            throw new Error(

                data.error?.message ||

                "Failed to upload image"
            );
        }

        console.log("data from upload img service:", data);

        return data;
    },

};