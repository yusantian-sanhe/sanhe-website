"use client";

import { useTranslations } from "next-intl";
import { Container, Heading, Section } from "@/components/ui";

const advantageItems = [
  {
    key: "planting",
    icon: "plant",
    featured: true,
  },
  {
    key: "processing",
    icon: "factory",
    featured: false,
  },
  {
    key: "coldChain",
    icon: "snow",
    featured: false,
  },
  {
    key: "traceability",
    icon: "trace",
    featured: true,
  },
  {
    key: "customPackaging",
    icon: "package",
    featured: false,
  },
  {
    key: "stableSupply",
    icon: "calendar",
    featured: false,
  },
] as const;

type AdvantageIconName =
  (typeof advantageItems)[number]["icon"];

function AdvantageIcon({
  icon,
}: {
  icon: AdvantageIconName;
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "plant") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 21V10" />
        <path d="M12 14C7.5 14 5 11.5 5 7c4.5 0 7 2.5 7 7Z" />
        <path d="M12 11c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Z" />
        <path d="M7 21h10" />
      </svg>
    );
  }

  if (icon === "factory") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 21V10l6 3V9l6 3V5h4v16H4Z" />
        <path d="M8 17h2" />
        <path d="M13 17h2" />
        <path d="M18 17h2" />
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

  if (icon === "package") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 10h18" />
      <path d="m8 15 2 2 5-5" />
    </svg>
  );
}

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <Heading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />

            <div className="mt-8 rounded-[30px] bg-green-900 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-200">
                SanHe
              </p>

              <h3 className="mt-4 text-3xl font-bold leading-tight">
                {t("title")}
              </h3>

              <p className="mt-5 leading-8 text-green-100">
                {t("description")}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-3xl font-extrabold">6</p>
                  <p className="mt-2 text-sm leading-6 text-green-100">
                    {t("eyebrow")}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-3xl font-extrabold">B2B</p>
                  <p className="mt-2 text-sm leading-6 text-green-100">
                    SanHe
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {advantageItems.map((item, index) => {
              const isFeatured = item.featured;

              return (
                <article
                  key={item.key}
                  className={`group flex h-full flex-col rounded-[30px] border p-7 transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl ${
                    isFeatured
                      ? "border-green-800 bg-green-800 text-white shadow-lg"
                      : "border-gray-100 bg-gray-50 text-gray-950 shadow-sm hover:border-green-200"
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
                      <AdvantageIcon icon={item.icon} />
                    </div>

                    <span
                      className={`text-sm font-extrabold tracking-[0.12em] ${
                        isFeatured
                          ? "text-green-200"
                          : "text-green-700"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={`mt-7 text-2xl font-bold ${
                      isFeatured
                        ? "text-white"
                        : "text-gray-950"
                    }`}
                  >
                    {t(`items.${item.key}.title`)}
                  </h3>

                  <p
                    className={`mt-5 flex-1 leading-7 ${
                      isFeatured
                        ? "text-green-100"
                        : "text-gray-600"
                    }`}
                  >
                    {t(`items.${item.key}.description`)}
                  </p>

                  <div
                    className={`mt-8 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20 ${
                      isFeatured
                        ? "bg-green-200"
                        : "bg-green-700"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}