"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Heading, Section } from "@/components/ui";

const supplyChainSteps = [
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
    key: "inspection",
    icon: "inspection",
  },
  {
    key: "export",
    icon: "ship",
  },
] as const;

type SupplyChainIconName =
  (typeof supplyChainSteps)[number]["icon"];

function SupplyChainIcon({
  icon,
}: {
  icon: SupplyChainIconName;
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

  if (icon === "inspection") {
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

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 16h18" />
      <path d="m5 16 2 4h10l2-4" />
      <path d="M7 16V8h8l3 4v4" />
      <path d="M9 8V5h5v3" />
      <circle cx="8" cy="20" r="1" />
      <circle cx="16" cy="20" r="1" />
    </svg>
  );
}

export function SupplyChainProcess() {
  const t = useTranslations("supplyChain");

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="group relative mt-12 h-[280px] overflow-hidden rounded-[30px] bg-green-100 shadow-lg sm:h-[320px] lg:h-[340px]">
          <Image
            src="/images/homepage/supply-chain.jpg"
            alt={t("title")}
            fill
            quality={88}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.02]"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent rtl:bg-gradient-to-l"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="relative mt-12">
          <div
            className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-green-100 via-green-500 to-green-100 xl:block"
            aria-hidden="true"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {supplyChainSteps.map((step, index) => (
              <article
                key={step.key}
                className="group relative flex h-full flex-col rounded-[26px] border border-gray-100 bg-white p-6 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                    <SupplyChainIcon icon={step.icon} />

                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-900 text-[11px] font-bold text-white shadow-sm rtl:-left-2 rtl:right-auto">
                      {index + 1}
                    </span>
                  </div>

                  <span className="text-xs font-extrabold tracking-[0.12em] text-green-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-950">
                  {t(`steps.${step.key}.title`)}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {t(`steps.${step.key}.description`)}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />

                  {index < supplyChainSteps.length - 1 && (
                    <span
                      className="hidden text-base font-bold text-green-600 xl:inline rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-center gap-4 rounded-2xl border border-green-100 bg-white px-6 py-5 text-center shadow-sm sm:flex-row sm:text-left rtl:sm:text-right">
          <div
            className="h-10 w-1 shrink-0 rounded-full bg-green-700 sm:h-1 sm:w-12"
            aria-hidden="true"
          />

          <p className="text-base leading-7 text-gray-600">
            {t("closing")}
          </p>

          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-green-800">
            SanHe
          </span>
        </div>
      </Container>
    </Section>
  );
}