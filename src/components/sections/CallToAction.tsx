"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button, Container, Section } from "@/components/ui";

const highlightItems = [
  {
    key: "oem",
    icon: "factory",
  },
  {
    key: "privateLabel",
    icon: "label",
  },
  {
    key: "mixedContainers",
    icon: "container",
  },
  {
    key: "stableSupply",
    icon: "calendar",
  },
] as const;

type HighlightIconName =
  (typeof highlightItems)[number]["icon"];

function HighlightIcon({
  icon,
}: {
  icon: HighlightIconName;
}) {
  const className =
    "h-6 w-6 fill-none stroke-current stroke-2";

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

  if (icon === "label") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 4h8l8 8-8 8-8-8V4Z" />
        <circle cx="9" cy="9" r="1.5" />
      </svg>
    );
  }

  if (icon === "container") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <rect x="3" y="6" width="18" height="12" rx="1" />
        <path d="M7 6v12" />
        <path d="M12 6v12" />
        <path d="M17 6v12" />
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

export function CallToAction() {
  const locale = useLocale();
  const t = useTranslations("cta");

  return (
    <Section className="relative overflow-hidden bg-green-950 text-white">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-700/25 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-green-800 via-green-900 to-green-950 px-6 py-12 shadow-2xl sm:px-10 sm:py-16 lg:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 800 400"
              className="h-full w-full"
            >
              <circle
                cx="680"
                cy="80"
                r="180"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="680"
                cy="80"
                r="120"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M0 310C160 240 290 360 450 280S680 210 800 250"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              {t("eyebrow")}
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">
              {t("description")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlightItems.map((item) => (
                <div
                  key={item.key}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-start backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-100 transition group-hover:bg-white group-hover:text-green-800">
                    <HighlightIcon icon={item.icon} />
                  </div>

                  <span className="font-semibold leading-6 text-white">
                    {t(`highlights.${item.key}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href={`/${locale}/contact`}
                variant="secondary"
              >
                {t("contact")}
              </Button>

              <Button
                href={`/${locale}/products`}
                className="border border-green-300 bg-transparent text-white hover:bg-white/10"
              >
                {t("products")}
              </Button>
            </div>

            <p className="mt-7 text-sm leading-6 text-green-200">
              {t("responseNote")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}