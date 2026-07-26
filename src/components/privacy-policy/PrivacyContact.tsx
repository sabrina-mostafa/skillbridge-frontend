import { Mail, Phone } from "lucide-react";

export default function PrivacyContact() {
    return (
        <section className="border-t bg-muted/30 py-20">
            <div className="mx-auto max-w-4xl px-6 text-center">

                <h2 className="text-3xl font-bold">
                    Questions About Our Privacy Policy?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
                    If you have questions about how SkillBridge handles your
                    personal information, feel free to contact our support team.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">

                    <div className="flex items-center gap-3 rounded-2xl border bg-background px-6 py-4">
                        <Mail className="h-5 w-5 text-primary" />

                        <span>support@skillbridge.com</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border bg-background px-6 py-4">
                        <Phone className="h-5 w-5 text-primary" />

                        <span>+880 1234-567890</span>
                    </div>

                </div>

            </div>
        </section>
    );
}