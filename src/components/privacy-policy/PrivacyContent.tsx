export default function PrivacyContent() {
    const sections = [
        {
            title: "1. Information We Collect",
            content:
                "When you create an account, book tutoring sessions, or contact us, we may collect information such as your name, email address, profile details, learning preferences, and payment-related information where applicable.",
        },
        {
            title: "2. How We Use Your Information",
            content:
                "We use your information to provide tutoring services, manage bookings, improve platform performance, personalize your experience, communicate important updates, and ensure platform security.",
        },
        {
            title: "3. Sharing Your Information",
            content:
                "SkillBridge does not sell your personal information. We only share data when necessary to deliver our services, comply with legal obligations, or work with trusted service providers.",
        },
        {
            title: "4. Data Security",
            content:
                "We implement appropriate technical and organizational measures to protect your information against unauthorized access, disclosure, or misuse.",
        },
        {
            title: "5. Cookies",
            content:
                "Our platform may use cookies and similar technologies to improve functionality, remember your preferences, and analyze website usage.",
        },
        {
            title: "6. Your Rights",
            content:
                "You may request access, correction, or deletion of your personal information. You can also contact us regarding any concerns about your data.",
        },
        {
            title: "7. Policy Updates",
            content:
                "We may update this Privacy Policy periodically. Any changes will be reflected on this page along with the updated revision date.",
        },
    ];

    return (
        <section className="py-24">
            <div className="mx-auto max-w-5xl px-6">

                <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-sm">

                    <div className="space-y-10">

                        {sections.map((section) => (
                            <div key={section.title}>
                                <h2 className="text-2xl font-semibold">
                                    {section.title}
                                </h2>

                                <p className="mt-4 leading-8 text-muted-foreground">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}