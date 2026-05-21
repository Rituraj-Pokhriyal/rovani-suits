import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { TheProcess } from "@/components/home/TheProcess";
import { MeasureTeaser } from "@/components/home/MeasureTeaser";
import { LookbookTeaser } from "@/components/home/LookbookTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { BespokeCTA } from "@/components/home/BespokeCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedCollection />
      <TheProcess />
      <MeasureTeaser />
      <LookbookTeaser />
      <Testimonials />
      <BespokeCTA />
    </main>
  );
}
