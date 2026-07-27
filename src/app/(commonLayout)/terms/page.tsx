import SectionHeader from "@/components/common/SectionHeader";


export default function TermsPage() {
    return (
        <div>
            <section className="border-b pt-14 bg-gradient-to-b from-primary/5 to-background">
                <div className="mx-auto max-w-4xl px-6 py-20">
                    <SectionHeader
                        // centered
                        // badge="Legal"
                        title="Terms & Conditions"
                        description="Please read these Terms & Conditions carefully before using SkillBridge. By accessing or using our platform, you agree to be bound by these terms."
                    />
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-4xl space-y-10 px-6">
                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            1. Acceptance of Terms
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            By accessing or using SkillBridge, you acknowledge
                            that you have read, understood, and agree to comply
                            with these Terms & Conditions. If you do not agree,
                            please discontinue use of the platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            2. User Accounts
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            Users are responsible for maintaining accurate
                            account information and protecting their login
                            credentials. Any activity performed under your
                            account is your responsibility.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            3. Tutor Responsibilities
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            Tutors are expected to provide accurate profile
                            information, maintain professional conduct, and
                            deliver scheduled tutoring sessions responsibly.
                            SkillBridge reserves the right to suspend or remove
                            accounts that violate platform policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            4. Student Responsibilities
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            Students must use the platform respectfully, attend
                            scheduled sessions, and communicate professionally
                            with tutors. Any misuse of the platform may result
                            in account restrictions.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            5. Bookings & Payments
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            Booking availability depends on tutor schedules.
                            Payment terms, cancellations, and refunds are
                            subject to the policies communicated during the
                            booking process and may change over time.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            6. Intellectual Property
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            All platform content, including branding, design,
                            graphics, and software, belongs to SkillBridge or
                            its licensors and may not be copied, reproduced, or
                            distributed without permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            7. Limitation of Liability
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            SkillBridge provides a platform connecting students
                            and tutors. While we strive to maintain a reliable
                            service, we are not responsible for disputes,
                            learning outcomes, or interruptions beyond our
                            reasonable control.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            8. Changes to These Terms
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            We may update these Terms & Conditions periodically.
                            Continued use of SkillBridge after changes are
                            published constitutes acceptance of the revised
                            terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-3 text-2xl font-semibold">
                            9. Contact Us
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            If you have any questions regarding these Terms &
                            Conditions, please contact us through our Contact
                            page or email us at{" "}
                            <span className="font-medium text-foreground">
                                support@skillbridge.com
                            </span>.
                        </p>
                    </div>

                    <div className="border-t pt-8 text-sm text-muted-foreground">
                        Last Updated:{" "}
                        <span className="font-medium text-foreground">
                            July 2026
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}