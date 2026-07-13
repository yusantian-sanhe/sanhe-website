import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface MarketsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: MarketsPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "markets",
  });

  return generatePageMetadata({
    title: t("hero.title"),
    description: t("hero.description"),
    path: `/${locale}/markets`,
    alternatePath: "/markets",
  });
}

export default async function MarketsPage({
  params,
}: MarketsPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "markets",
  });

  const stats = [
    "markets",
    "regions",
    "service",
  ] as const;

  const markets = [
    "middleEast",
    "europe",
    "asia",
    "africa",
    "americas",
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
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Heading
                eyebrow={t("markets.eyebrow")}
                title={t("markets.title")}
                description={t("markets.description")}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-2xl border border-green-100 bg-green-50 p-5"
                  >
                    <p className="text-3xl font-extrabold text-green-800">
                      {t(`overview.stats.${stat}.value`)}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {t(`overview.stats.${stat}.label`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative min-h-[380px] overflow-hidden rounded-3xl bg-green-100 shadow-xl sm:min-h-[460px]">
              <Image
                src="/markets/global-export.jpg"
                alt={t("hero.title")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex rounded-full border border-white/30 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {t("overview.imageLabel")}
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
            eyebrow={t("markets.eyebrow")}
            title={t("markets.title")}
            description={t("markets.description")}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {markets.map((market, index) => (
              <Card
                key={market}
                className="group h-full transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl"
                    aria-hidden="true"
                  >
                    🌍
                  </div>

                  <span className="text-sm font-bold text-green-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-950">
                  {t(`markets.items.${market}.title`)}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {t(`markets.items.${market}.description`)}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-green-700 transition-all duration-300 group-hover:w-20" />
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}