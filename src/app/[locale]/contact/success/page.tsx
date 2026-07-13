import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  Button,
  Card,
  Container,
  Section,
} from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

interface ContactSuccessPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ContactSuccessPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "contact.success",
  });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/contact/success`,
    locale,
    noIndex: true,
  });
}

export default async function ContactSuccessPage({
  params,
}: ContactSuccessPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "contact.success",
  });

  const nextSteps = [
    "review",
    "contact",
    "solution",
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-green-800 shadow-xl">
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10 fill-none stroke-current stroke-2"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path d="m8 12 2.5 2.5L16.5 9" />
              </svg>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              {t("eyebrow")}
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("title")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href={`/${locale}/products`}
                variant="secondary"
              >
                {t("browseProducts")}
              </Button>

              <Button
                href={`/${locale}`}
                className="border border-green-300 bg-transparent text-white hover:bg-green-800"
              >
                {t("backHome")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                {t("next.eyebrow")}
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-950">
                {t("next.title")}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                {t("next.description")}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {nextSteps.map(
                (step, index) => (
                  <Card
                    key={step}
                    className="h-full text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                      {index + 1}
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-gray-950">
                      {t(
                        `next.items.${step}.title`
                      )}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      {t(
                        `next.items.${step}.description`
                      )}
                    </p>
                  </Card>
                )
              )}
            </div>

            <div className="mt-10 rounded-3xl border border-green-100 bg-white px-6 py-7 text-center shadow-sm">
              <p className="font-semibold text-gray-950">
                {t("support.title")}
              </p>

              <p className="mt-2 leading-7 text-gray-600">
                {t(
                  "support.description"
                )}
              </p>

              <div className="mt-6">
                <Button
                  href={`/${locale}/contact`}
                >
                  {t("support.button")}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}