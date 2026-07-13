"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button, Container, Section } from "@/components/ui";

const processItems = [
  {
    key: "planting",
    icon: "plant",
  },
  {
    key: "processing",
    icon: "factory",
  },
  {
    key: "coldChain",
    icon: "snow",
  },
  {
    key: "export",
    icon: "globe",
  },
] as const;

const trustItemConfig = [
  {
    key: "planting",
    icon: "plant",
  },
  {
    key: "processing",
    icon: "factory",
  },
  {
    key: "coldChain",
    icon: "snow",
  },
  {
    key: "traceability",
    icon: "trace",
  },
] as const;

type HeroIconName =
  | (typeof processItems)[number]["icon"]
  | (typeof trustItemConfig)[number]["icon"];

function HeroIcon({
  icon,
}: {
  icon: HeroIconName;
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

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("hero");

  return (
    <Section className="overflow-hidden bg-gradient-to-b from-green-50 via-white to-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:items-center lg:gap-14">
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-green-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 shadow-sm backdrop-blur sm:text-sm">
              {t("badge")}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {t("titleLine1")}
              <br className="hidden sm:block" />
              <span className="sm:ms-0">
                {t("titleLine2")}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href={`/${locale}/products`}>
                {t("viewProducts")}
              </Button>

              <Button
                href={`/${locale}/contact`}
                variant="outline"
              >
                {t("contactSales")}
              </Button>
            </div>
          </div>

          <div className="relative pb-4 lg:pb-28">
            <div className="group relative min-h-[360px] overflow-hidden rounded-[30px] bg-green-100 shadow-xl sm:min-h-[460px] lg:min-h-[540px] lg:rounded-[38px] lg:shadow-2xl">
              <Image
                src="/hero/hero-home.jpg"
                alt={`${t("titleLine1")} ${t("titleLine2")}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            </div>

            <div className="relative z-10 mx-3 -mt-7 rounded-[26px] border border-gray-100 bg-white/95 p-5 shadow-xl backdrop-blur sm:mx-7 sm:-mt-9 sm:p-6 lg:absolute lg:-bottom-1 lg:left-1/2 lg:mx-0 lg:mt-0 lg:w-[90%] lg:-translate-x-1/2 lg:shadow-2xl">
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-green-700 sm:text-sm">
                {t("supplyChainTitle")}
              </p>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {processItems.map((item, index) => (
                  <div
                    key={item.key}
                    className="relative rounded-2xl bg-green-50/70 px-3 py-4 text-center lg:bg-transparent lg:px-1 lg:py-0"
                  >
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
                      <HeroIcon icon={item.icon} />

                      <span className="absolute -top-2 end-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-800 text-xs font-bold text-white shadow-sm">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-bold leading-6 text-gray-950 sm:text-base">
                      {t(`process.${item.key}`)}
                    </h3>

                    {index < processItems.length - 1 && (
                      <span
                        className="absolute -end-4 top-5 hidden text-xl font-bold text-green-600 lg:block rtl:rotate-180"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="pointer-events-none absolute -right-20 -top-16 -z-10 h-64 w-64 rounded-full bg-green-100/70 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-14 -left-14 -z-10 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:mt-16 xl:grid-cols-4">
          {trustItemConfig.map((item, index) => (
            <article
              key={item.key}
              className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                  <HeroIcon icon={item.icon} />
                </div>

                <span className="text-sm font-extrabold text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold text-gray-950">
                {t(`trustItems.${item.key}.title`)}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-gray-600">
                {t(`trustItems.${item.key}.description`)}
              </p>

              <div className="mt-7 h-1 w-12 rounded-full bg-green-700 transition-all duration-300 group-hover:w-20" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}