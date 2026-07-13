"use client";

import {
  Button,
  Container,
  Section,
} from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProductInquiryCTAProps {
  locale: string;
  productName: string;
}

const highlights = [
  {
    key: "oem",
    icon: "factory",
  },
  {
    key: "privateLabel",
    icon: "label",
  },
  {
    key: "customizedPackaging",
    icon: "package",
  },
  {
    key: "mixedContainers",
    icon: "container",
  },
] as const;

type HighlightIconName =
  (typeof highlights)[number]["icon"];

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
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M7 6v12" />
      <path d="M12 6v12" />
      <path d="M17 6v12" />
    </svg>
  );
}

export function ProductInquiryCTA({
  locale,
  productName,
}: ProductInquiryCTAProps) {
  const t = useTranslations(
    "products.detailSections.inquiry"
  );

  const productsT = useTranslations("products");

  const inquiryUrl =
    `/${locale}/contact?product=${encodeURIComponent(
      productName
    )}`;

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
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-green-800 via-green-900 to-green-950 px-6 py-12 shadow-2xl sm:px-10 sm:py-16 lg:px-14">
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
                {t("eyebrow")}
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
                {t("title", {
                  product: productName,
                })}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">
                {t("description")}
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.key}
                    className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-100 transition group-hover:bg-white group-hover:text-green-800">
                      <HighlightIcon icon={item.icon} />
                    </span>

                    <span className="font-semibold leading-6 text-white">
                      {t(`highlights.${item.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white p-7 text-gray-950 shadow-2xl sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                {t("eyebrow")}
              </p>

              <h3 className="mt-4 text-3xl font-bold leading-tight">
                {productName}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {t("description")}
              </p>

              <div className="mt-8 grid gap-4">
                <Button href={inquiryUrl}>
                  {t("button")}
                </Button>

                <Button
                  href={`/${locale}/products`}
                  variant="secondary"
                >
                  {productsT("backToProducts")}
                </Button>
              </div>

              <div className="mt-7 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-green-800">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100"
                    aria-hidden="true"
                  >
                    ✓
                  </span>

                  <span>{t("highlights.customizedPackaging")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}