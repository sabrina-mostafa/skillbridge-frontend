import PrivacyContact from "@/components/privacy-policy/PrivacyContact";
import PrivacyContent from "@/components/privacy-policy/PrivacyContent";
import PrivacyHero from "@/components/privacy-policy/PrivacyHero";


export default function PrivacyPolicyPage() {
    return (
        <main className="bg-background">
            <PrivacyHero />
            <PrivacyContent />
            <PrivacyContact />
        </main>
    );
}