import Footer from "@/components/common/Footer";
import PrivacyContact from "@/components/privacy-policy/PrivacyContact";
import PrivacyContent from "@/components/privacy-policy/PrivacyContent";
import PrivacyHero from "@/components/privacy-policy/PrivacyHero";


export default function PrivacyPolicyPage() {
    return (
        <main className="mt-14 bg-background">
            <PrivacyHero />
            <PrivacyContent />
            <PrivacyContact />
            <Footer />
        </main>
    );
}