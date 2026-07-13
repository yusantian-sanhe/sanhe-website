"use client";

import {
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProductPackagingProps {
  packagingOptions: string[];
}

const packagingConfig = {
  "10kg Carton": {
    key: "tenKgCarton",
    icon: "carton",
  },
  "13.6kg Carton": {
    key: "thirteenSixKgCarton",
    icon: "carton",
  },
  "Mesh Bag": {
    key: "meshBag",
    icon: "bag",
  },
  "Customized Packaging": {
    key: "customizedPackaging",
    icon: "custom",
  },
  "Private Label": {
    key: "privateLabel",
    icon: "label",
  },
} as const;

type PackagingIconName =
  (typeof packagingConfig)[keyof typeof packagingConfig]["icon"];

function PackagingIcon({
  icon,
}: {
  icon: PackagingIconName;
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "carton") {
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

  if (icon === "bag") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M7 8h10l2 13H5L7 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
        <path d="M9 13h6" />
        <path d="M10 17h4" />
      </svg>
    );
  }

  if (icon === "custom") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
        <path d="M17 3v4" />
        <path d="M15 5h4" />
      </svg>
    );
  }

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

export function ProductPackaging({
  packagingOptions,
}: ProductPackagingProps) {
  const t = useTranslations(
    "products.detailSections.packaging"
  );

  const visibleOptions = packagingOptions.flatMap(
    (item) => {
      const config =
        packagingConfig[
          item as keyof typeof packagingConfig
        ];

      return config ? [config] : [];
    }
  );

  if (visibleOptions.length === 0) {
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {visibleOptions.map((item, index) => (
            <article
              key={`${item.key}-${index}`}
              className="group flex h-full flex-col rounded-[28px] border border-gray-100 bg-gray-50 p-6 transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                  <PackagingIcon icon={item.icon} />
                </div>

                <span className="text-xs font-extrabold tracking-[0.12em] text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 text-lg font-bold leading-7 text-gray-950">
                {t(`options.${item.key}`)}
              </h3>

              <div className="mt-7 h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}