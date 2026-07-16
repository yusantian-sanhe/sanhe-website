"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Heading, Section } from "@/components/ui";

const qualityItems = [
  {
    key: "sgs",
    icon: "inspection",
    featured: false,
  },
  {
    key: "haccp",
    icon: "shield",
    featured: false,
  },
  {
    key: "brc",
    icon: "standard",
    featured: false,
  },
  {
    key: "traceability",
    icon: "trace",
    featured: true,
  },
  {
    key: "coldChain",
    icon: "snow",
    featured: true,
  },
  {
    key: "inspection",
    icon: "check",
    featured: false,
  },
] as const;

type QualityIconName =
  (typeof qualityItems)[number]["icon"];

function QualityIcon({
  icon,
}: {
  icon: QualityIconName;
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "inspection") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 5 5" />
        <path d="M8 10.5h5" />
        <path d="M10.5 8v5" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 3 19 6v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (icon === "standard") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M7 3h10v18H7Z" />
        <path d="M10 7h4" />
        <path d="M10 11h4" />
        <path d="M10 15h4" />
      </svg>
    );
  }

  if (icon === "trace") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h4a4 4 0 0 1 4 4v6" />
        <path d="m13 13 3 3 3-3" />
      </svg>
    );
  }

  if (icon === "snow") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 2v20" />
        <path d="m4.2 6.5 15.6 11" />
        <path d="m19.8 6.5-15.6 11" />
        <path d="m9 4 3 3 3-3" />
        <path d="m9 20 3-3 3 3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16.5 9" />
    </svg>
  );
}

export function Certificates() {
  const t = useTranslations("certificates");

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <div className="grid gap-5 md:grid-cols-2">
            {qualityItems.map((item, index) => {
              const isFeatured = item.featured;

              return (
                <article
                  key={item.key}
                  className={`group flex h-full flex-col rounded-[26px] border p-6 transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg ${
                    isFeatured
                      ? "border-green-800 bg-green-800 text-white shadow-lg"
                      : "border-gray-100 bg-white text-gray-950 shadow-sm hover:border-green-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 ${
                        isFeatured
                          ? "bg-white/10 text-green-100"
                          : "bg-green-100 text-green-800 group-hover:bg-green-800 group-hover:text-white"
                      }`}
                    >
                      <QualityIcon icon={item.icon} />
                    </div>

                    <span
                      className={`text-xs font-extrabold tracking-[0.12em] ${
                        isFeatured
                          ? "text-green-200"
                          : "text-green-700"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 text-xl font-bold ${
                      isFeatured
                        ? "text-white"
                        : "text-gray-950"
                    }`}
                  >
                    {t(`items.${item.key}.title`)}
                  </h3>

                  <p
                    className={`mt-3 flex-1 text-sm leading-6 ${
                      isFeatured
                        ? "text-green-100"
                        : "text-gray-600"
                    }`}
                  >
                    {t(`items.${item.key}.description`)}
                  </p>

                  <div
                    className={`mt-6 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 ${
                      isFeatured
                        ? "bg-green-200"
                        : "bg-green-700"
                    }`}
                  />
                </article>
              );
            })}
          </div>

          <div className="xl:sticky xl:top-28">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[32px] bg-green-100 shadow-xl">
              <Image
                src="/images/homepage/certificates.jpg"
                alt={t("title")}
                fill
                quality={88}
                sizes="(max-width: 1279px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.03]"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-7 bottom-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100">
                  {t("panel.eyebrow")}
                </p>

                <p className="mt-2 max-w-md text-xl font-bold leading-8 text-white">
                  {t("panel.notice")}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                    <QualityIcon icon="check" />
                  </div>

                  <div>
                    <p className="text-2xl font-extrabold text-green-900">
                      6
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {t("eyebrow")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-green-900 px-5 py-4 text-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-100">
                    <QualityIcon icon="shield" />
                  </div>

                  <div>
                    <p className="text-2xl font-extrabold">
                      {t("panel.supportValue")}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-100">
                      {t("panel.supportLabel")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}