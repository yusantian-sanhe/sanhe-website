import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CallToAction } from "@/components/sections/CallToAction";
import { Certificates } from "@/components/sections/Certificates";
import { ExportMarkets } from "@/components/sections/ExportMarkets";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroStatistics } from "@/components/sections/HeroStatistics";
import { SupplyChainProcess } from "@/components/sections/SupplyChainProcess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

interface LocaleHomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocaleHomePageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "hero",
  });

  return generatePageMetadata({
    title: t("titleLine1"),
    description: t("description"),
    path: `/${locale}`,
    alternatePath: "",
  
    locale,});
}

export default function LocaleHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <HeroSection />
      <HeroStatistics />
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