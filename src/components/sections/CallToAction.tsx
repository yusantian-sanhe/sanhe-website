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
    "h-5 w-5 fill-none stroke-current stroke-2";

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
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-700/25 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-green-800 via-green-900 to-green-950 px-6 py-10 shadow-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 800 400"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid slice"
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-200 sm:text-sm">
              {t("eyebrow")}
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-green-100 sm:text-lg sm:leading-8">
              {t("description")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {highlightItems.map((item) => (
                <div
                  key={item.key}
                  className="group flex min-h-20 items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-start backdrop-blur transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-100 transition group-hover:bg-white group-hover:text-green-800">
                    <HighlightIcon icon={item.icon} />
                  </div>

                  <span className="text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                    {t(`highlights.${item.key}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-green-200">
              {t("responseNote")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}