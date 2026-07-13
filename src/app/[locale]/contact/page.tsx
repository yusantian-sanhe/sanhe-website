import { InquiryForm } from "@/components/contact/InquiryForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { company } from "@/constants/company";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    product?: string | string[];
  }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "contact",
  });

  return generatePageMetadata({
    title: t("hero.title"),
    description: t(
      "hero.description"
    ),
    path: `/${locale}/contact`,
    alternatePath: "/contact",
  });
}

const contactItems = [
  {
    key: "email",
    value: company.email,
    icon: "email",
  },
  {
    key: "phone",
    value: company.phone,
    icon: "phone",
  },
  {
    key: "whatsapp",
    value: company.whatsapp,
    icon: "message",
  },
  {
    key: "address",
    value: company.address,
    icon: "location",
  },
  {
    key: "responseTime",
    value: company.responseTime,
    icon: "clock",
  },
] as const;

const reasons = [
  "planting",
  "processing",
  "coldChain",
  "traceability",
  "oem",
  "certification",
] as const;

type ContactIconName =
  (typeof contactItems)[number]["icon"];

function ContactIcon({
  icon,
}: {
  icon: ContactIconName;
}) {
  const className =
    "h-6 w-6 fill-none stroke-current stroke-2";

  if (icon === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
        />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M6.5 3.5 9 8l-2 2c1.5 3 3.5 5 6.5 6.5l2-2 4.5 2.5v3c0 .8-.7 1.5-1.5 1.5C10 21.5 2.5 14 2.5 5.5 2.5 4.7 3.2 4 4 4h2.5Z" />
      </svg>
    );
  }

  if (icon === "message") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.4L3 21l2.1-5.5A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle
          cx="12"
          cy="10"
          r="2.5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default async function ContactPage({
  params,
  searchParams,
}: ContactPageProps) {
  const { locale } = await params;

  const resolvedSearchParams =
    await searchParams;

  const productParam =
    resolvedSearchParams.product;

  const initialProductName =
    typeof productParam === "string"
      ? productParam
      : "";

  const t = await getTranslations({
    locale,
    namespace: "contact",
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            description={t(
              "hero.description"
            )}
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div className="space-y-5">
              <Card className="h-fit">
                <h2 className="text-3xl font-bold text-gray-950">
                  {t("form.title")}
                </h2>

                <InquiryForm
                  locale={locale}
                  initialProductName={
                    initialProductName
                  }
                />
              </Card>

              <div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-none stroke-current stroke-2"
                    aria-hidden="true"
                  >
                    <path d="M12 3 19 6v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3Z" />
                    <path d="m9 12 2 2 4-5" />
                  </svg>
                </div>

                <p className="pt-1 leading-7 text-gray-700">
                  {t(
                    "form.privacyNote"
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group relative min-h-[300px] overflow-hidden rounded-3xl bg-green-100 shadow-lg sm:min-h-[380px]">
                <Image
                  src="/contact/export-team-office.jpg"
                  alt={t("team.title")}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 45vw"
                  className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                />
              </div>

              <Card>
                <h2 className="text-3xl font-bold text-gray-950">
                  {t("team.title")}
                </h2>

                <div className="mt-7 space-y-4">
                  {contactItems.map(
                    (item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition hover:border-green-200 hover:bg-green-50"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                          <ContactIcon
                            icon={item.icon}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-gray-950">
                            {t(
                              `team.items.${item.key}`
                            )}
                          </p>

                          <p className="mt-1 break-words leading-6 text-gray-600">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold text-gray-950">
                  {t(
                    "reasons.title"
                  )}
                </h2>

                <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {reasons.map(
                    (reason) => (
                      <div
                        key={reason}
                        className="text-center"
                      >
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-700 text-xl font-bold text-green-700">
                          ✓
                        </div>

                        <p className="mt-4 text-sm leading-6 text-gray-700">
                          {t(
                            `reasons.items.${reason}`
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}