"use client";

import {
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProductAdvantagesProps {
  advantages: {
    title: string;
    description: string;
  }[];
}

const advantageConfig = {
  "Fresh from Source": {
    key: "freshFromSource",
    icon: "source",
  },
  "Stable Year-round Supply": {
    key: "stableSupply",
    icon: "calendar",
  },
  "Factory Direct Processing": {
    key: "factoryProcessing",
    icon: "factory",
  },
  "Cold Chain Warehousing": {
    key: "coldChain",
    icon: "snow",
  },
  "Customized Packaging": {
    key: "customizedPackaging",
    icon: "package",
  },
  "Global Export Experience": {
    key: "globalExport",
    icon: "globe",
  },
} as const;

type AdvantageIconName =
  (typeof advantageConfig)[keyof typeof advantageConfig]["icon"];

function AdvantageIcon({
  icon,
}: {
  icon: AdvantageIconName;
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "source") {
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

  if (icon === "calendar") {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function ProductAdvantages({
  advantages,
}: ProductAdvantagesProps) {
  const t = useTranslations(
    "products.detailSections.advantages"
  );

  const visibleAdvantages = advantages.flatMap((item) => {
    const config =
      advantageConfig[
        item.title as keyof typeof advantageConfig
      ];

    return config ? [config] : [];
  });

  if (visibleAdvantages.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleAdvantages.map((item, index) => (
            <article
              key={item.key}
              className="group flex h-full flex-col rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                  <AdvantageIcon icon={item.icon} />
                </div>

                <span className="text-sm font-extrabold tracking-[0.12em] text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-950">
                {t(`items.${item.key}.title`)}
              </h3>

              <p className="mt-5 flex-1 leading-7 text-gray-600">
                {t(`items.${item.key}.description`)}
              </p>

              <div className="mt-8 h-1 w-12 rounded-full bg-green-700 transition-all duration-300 group-hover:w-20" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}