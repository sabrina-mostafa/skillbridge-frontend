import Contact from "@/components/landing/Contact";
import BenefitsSection from "@/components/landing/BenefitsSection";
import { Hero } from "@/components/landing/Hero";
import { LearningStyles } from "@/components/landing/LearningStyles";
import Pricing from "@/components/landing/Pricing";
import { Steps } from "@/components/landing/Steps";
import PlatformFeatures from "@/components/landing/PlatformFeatures";
import CategorySection from "@/components/landing/CategorySection";
import TopInstructors from "@/components/landing/TopInstructors";
import FeaturedTutors from "@/components/landing/FeaturedTutors";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";


export default function Home() {
  return (
    <div className="mt-14">
      <main className="bg-background">
        <Hero />
        <CategorySection />
        <LearningStyles />
        <BenefitsSection />
        <Steps />
        <PlatformFeatures />
        <FeaturedTutors />
        <TopInstructors />
        <Pricing />
        <Contact />
      </main>

      <ScrollToTopButton />
    </div>
  );
}
