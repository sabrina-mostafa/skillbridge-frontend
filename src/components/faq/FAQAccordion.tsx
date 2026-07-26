"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type FAQCategory = {
    id: string;
    title: string;
    questions: {
        question: string;
        answer: string;
    }[];
};

const faqData: FAQCategory[] = [
    {
        id: "general",
        title: "General",
        questions: [
            {
                question: "What is SkillBridge?",
                answer:
                    "SkillBridge is a modern tutoring platform that connects students with verified tutors for personalized one-to-one online learning across various subjects.",
            },
            {
                question: "Who can use SkillBridge?",
                answer:
                    "Anyone can create an account. Students can book tutors, while educators can register as tutors, complete their profile, and start teaching.",
            },
            {
                question: "Is SkillBridge available worldwide?",
                answer:
                    "Yes. SkillBridge is designed for learners and tutors around the world, provided they have a stable internet connection.",
            },
        ],
    },

    {
        id: "students",
        title: "Students",
        questions: [
            {
                question: "How do I book a tutor?",
                answer:
                    "Browse tutors, select a tutor based on expertise and ratings, choose an available time slot, and confirm your booking.",
            },
            {
                question: "Can I cancel a booking?",
                answer:
                    "Yes. Students can cancel bookings before the scheduled session according to the platform's cancellation policy.",
            },
            {
                question: "Can I leave a review?",
                answer:
                    "Yes. After a session is marked as completed, you can rate your tutor and leave a review to help other students.",
            },
        ],
    },

    {
        id: "tutors",
        title: "Tutors",
        questions: [
            {
                question: "How do I become a tutor?",
                answer:
                    "Create an account, choose the Tutor role, complete your tutor profile, add your subjects, hourly rate, and availability.",
            },
            {
                question: "Can I teach multiple subjects?",
                answer:
                    "Yes. Tutors can add multiple teaching categories to showcase their expertise.",
            },
            {
                question: "How do students find me?",
                answer:
                    "Students can discover tutors through search, categories, featured listings, ratings, and reviews.",
            },
        ],
    },

    {
        id: "bookings",
        title: "Bookings",
        questions: [
            {
                question: "How are sessions scheduled?",
                answer:
                    "Sessions are scheduled based on each tutor's availability. Students simply choose an available time slot.",
            },
            {
                question: "Will I receive a meeting link?",
                answer:
                    "Yes. Once a booking is confirmed, the meeting information will be available in your dashboard before the session.",
            },
        ],
    },

    {
        id: "payments",
        title: "Payments",
        questions: [
            {
                question: "What payment methods are supported?",
                answer:
                    "Our payment system is currently under development. Multiple secure payment methods will be introduced in a future release.",
            },
            {
                question: "Can I request a refund?",
                answer:
                    "Refund functionality will become available alongside our complete payment system.",
            },
        ],
    },

    {
        id: "account",
        title: "Account",
        questions: [
            {
                question: "How do I verify my email?",
                answer:
                    "After registration, you'll receive a verification email. Simply click the verification link to activate your account.",
            },
            {
                question: "Can I update my profile later?",
                answer:
                    "Yes. Both students and tutors can edit their profile information anytime from their dashboard.",
            },
            {
                question: "I forgot my password. What should I do?",
                answer:
                    "Use the 'Forgot Password' option on the login page to receive a password reset link via email.",
            },
        ],
    },
];

export default function FAQAccordion() {
    return (
        <section className="bg-background px-6 py-18 md:py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Knowledge Base
                    </span>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Find quick answers to the most common questions about
                        SkillBridge, bookings, tutors, payments, and account
                        management.
                    </p>
                </div>

                <div className="space-y-12">
                    {faqData.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            id={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: categoryIndex * 0.05,
                            }}
                            className="rounded-3xl border bg-card p-8 shadow-sm"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold">
                                    {category.title}
                                </h3>

                                <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
                            </div>

                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {category.questions.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`${category.id}-${index}`}
                                        className="border-b last:border-none"
                                    >
                                        <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                                            {faq.question}
                                        </AccordionTrigger>

                                        <AccordionContent className="pb-6 text-base leading-8 text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}