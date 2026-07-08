import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CallToAction } from "@/components/sections/CallToAction";
import { Certificates } from "@/components/sections/Certificates";
import { ExportMarkets } from "@/components/sections/ExportMarkets";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { SupplyChainProcess } from "@/components/sections/SupplyChainProcess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { generatePageMetadata } from "@/lib/seo";
export const metadata = generatePageMetadata();
export default function LocaleHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <SupplyChainProcess />
      <WhyChooseUs />
      <ExportMarkets />
      <Certificates />
      <CallToAction />
      <Footer />
    </main>
  );
}