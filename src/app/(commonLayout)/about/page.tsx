import AboutCTA from "@/components/about/AboutCTA";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import MissionVision from "@/components/about/MissionVision";


export default function AboutPage() {
    return (
        <div>
            <AboutHero />
            <AboutStory />
            <MissionVision />
            <AboutCTA />
        </div>
    );
}