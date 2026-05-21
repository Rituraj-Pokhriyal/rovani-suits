import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { TheProcess } from "@/components/home/TheProcess";
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
      <LookbookTeaser />
      <Testimonials />
      <BespokeCTA />
    </main>
  );
}
