import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  return generatePageMetadata({
    title: t("hero.title"),
    description: t("hero.description"),
    path: `/${locale}/about`,
    alternatePath: "/about",
  });
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  const advantages = [
    "sourcing",
    "packing",
    "quality",
    "cooperation",
  ] as const;

  const stats = [
    "years",
    "markets",
    "shipments",
    "partners",
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            description={t("hero.description")}
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Heading
                eyebrow={t("intro.eyebrow")}
                title={t("intro.title")}
                description={t("intro.description")}
              />

              <p className="mt-6 leading-8 text-gray-600">
                {t("intro.content")}
              </p>
            </div>

            <div className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-green-100 shadow-xl sm:min-h-[420px]">
              <Image
                src="/about/farm.jpg"
                alt={t("intro.title")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex rounded-full border border-white/30 bg-black/25 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  SanHe Agricultural Supply Chain
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <Heading
            align="center"
            eyebrow={t("strengths.eyebrow")}
            title={t("strengths.title")}
            description={t("strengths.description")}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <Card key={item} className="h-full">
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl font-bold text-green-800"
                  aria-hidden="true"
                >
                  ✓
                </div>

                <h3 className="text-xl font-bold">
                  {t(`strengths.items.${item}`)}
                </h3>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-green-800 text-white">
        <Container>
          <div className="grid gap-10 text-center sm:grid-cols-2 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item}>
                <div className="text-5xl font-extrabold">
                  {t(`stats.${item}.value`)}
                </div>

                <p className="mt-3 text-green-100">
                  {t(`stats.${item}.label`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}