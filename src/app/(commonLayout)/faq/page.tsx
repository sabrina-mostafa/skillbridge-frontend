import FAQHero from "@/components/faq/FAQHero";
import FAQAccordion from "@/components/faq/FAQAccordion";
import FAQCategories from "@/components/faq/FAQCategories";
import FAQCTA from "@/components/faq/FAQCTA";


export default function FAQPage() {
    return (
        <>
            <FAQHero />
            <FAQCategories />
            <FAQAccordion />
            <FAQCTA />
        </>
    );
}