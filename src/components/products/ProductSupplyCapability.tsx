"use client";

import {
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProductSupplyCapabilityProps {
  capabilities: string[];
}

const capabilityConfig = {
  "Own Planting Bases": {
    key: "plantingBases",
    icon: "plant",
  },
  "Factory Direct Processing": {
    key: "factoryProcessing",
    icon: "factory",
  },
  "Cold Chain Warehousing": {
    key: "coldChain",
    icon: "snow",
  },
  "Full Product Traceability": {
    key: "traceability",
    icon: "trace",
  },
  "OEM & Private Label": {
    key: "oemPrivateLabel",
    icon: "label",
  },
  "Mixed Container Service": {
    key: "mixedContainer",
    icon: "container",
  },
} as const;

type CapabilityIconName =
  (typeof capabilityConfig)[keyof typeof capabilityConfig]["icon"];

function CapabilityIcon({
  icon,
}: {
  icon: CapabilityIconName;
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

export function ProductSupplyCapability({
  capabilities,
}: ProductSupplyCapabilityProps) {
  const t = useTranslations(
    "products.detailSections.supplyCapability"
  );

  const visibleCapabilities = capabilities.flatMap(
    (item) => {
      const config =
        capabilityConfig[
          item as keyof typeof capabilityConfig
        ];

      return config ? [config] : [];
    }
  );

  if (visibleCapabilities.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCapabilities.map((item, index) => (
            <article
              key={item.key}
              className="group flex h-full items-start gap-5 rounded-[28px] border border-gray-100 bg-gray-50 p-6 transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                <CapabilityIcon icon={item.icon} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold leading-7 text-gray-950">
                    {t(`items.${item.key}`)}
                  </h3>

                  <span className="shrink-0 text-xs font-extrabold text-green-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}