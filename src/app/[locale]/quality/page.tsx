import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface QualityPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: QualityPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "quality",
  });

  return generatePageMetadata({
    title: t("hero.title"),
    description: t("hero.description"),
    path: `/${locale}/quality`,
    alternatePath: "/quality",
  
    locale,});
}

const qualitySteps = [
  {
    key: "supplierSelection",
    icon: "plant",
  },
  {
    key: "productInspection",
    icon: "search",
  },
  {
    key: "packingControl",
    icon: "package",
  },
  {
    key: "exportDocumentation",
    icon: "document",
  },
] as const;

const commitmentItems = [
  {
    key: "inspection",
    icon: "shield",
  },
  {
    key: "traceability",
    icon: "trace",
  },
  {
    key: "coldChain",
    icon: "snow",
  },
  {
    key: "improvement",
    icon: "refresh",
  },
] as const;

type IconName =
  | (typeof qualitySteps)[number]["icon"]
  | (typeof commitmentItems)[number]["icon"];

function QualityIcon({ icon }: { icon: IconName }) {
  const commonClass =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "plant") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <path d="M12 21V10" />
        <path d="M12 14C7.5 14 5 11.5 5 7c4.5 0 7 2.5 7 7Z" />
        <path d="M12 11c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Z" />
        <path d="M7 21h10" />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
        <path d="M8.5 11h5" />
        <path d="M11 8.5v5" />
      </svg>
    );
  }

  if (icon === "package") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </svg>
    );
  }

  if (icon === "document") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <path d="M7 3h7l4 4v14H7V3Z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h5" />
        <path d="M10 17h5" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <path d="M12 3 19 6v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (icon === "trace") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h4a4 4 0 0 1 4 4v6" />
        <path d="m13 13 3 3 3-3" />
      </svg>
    );
  }

  if (icon === "snow") {
    return (
      <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
        <path d="M12 2v20" />
        <path d="m4.2 6.5 15.6 11" />
        <path d="m19.8 6.5-15.6 11" />
        <path d="m9 4 3 3 3-3" />
        <path d="m9 20 3-3 3 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={commonClass} aria-hidden="true">
      <path d="M20 11a8 8 0 1 0-2.3 5.7" />
      <path d="M20 4v7h-7" />
    </svg>
  );
}

export default async function QualityPage({
  params,
}: QualityPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "quality",
  });

  const stats = [
    "inspection",
    "stages",
    "support",
  ] as const;

  const cards = [
    "packing",
    "documentation",
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
                eyebrow={t("process.eyebrow")}
                title={t("process.title")}
                description={t("process.description")}
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
                src="/quality/inspection-lab.jpg"
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
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            description={t("process.description")}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {qualitySteps.map((step, index) => (
              <Card
                key={step.key}
                className="group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                    <QualityIcon icon={step.icon} />
                  </div>

                  <span className="text-sm font-extrabold text-green-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-950">
                  {t(`process.steps.${step.key}.title`)}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-gray-600">
                  {t(`process.steps.${step.key}.description`)}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-green-700 transition-all duration-300 group-hover:w-20" />
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow={t("commitments.eyebrow")}
            title={t("commitments.title")}
            description={t("commitments.description")}
            className="text-white"
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {commitmentItems.map((item) => (
              <div
                key={item.key}
                className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-green-100">
                  <QualityIcon icon={item.icon} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {t(`commitments.items.${item.key}.title`)}
                </h3>

                <p className="mt-4 leading-7 text-green-100">
                  {t(`commitments.items.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {cards.map((card) => (
              <Card key={card} className="h-full">
                <h3 className="text-2xl font-bold">
                  {t(`cards.${card}.title`)}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {t(`cards.${card}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}