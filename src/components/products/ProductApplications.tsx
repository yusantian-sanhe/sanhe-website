"use client";

import {
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProductApplicationsProps {
  applications: string[];
}

const applicationConfig = {
  Importers: {
    key: "importers",
    icon: "import",
  },
  Wholesalers: {
    key: "wholesalers",
    icon: "wholesale",
  },
  Supermarkets: {
    key: "supermarkets",
    icon: "store",
  },
  "Food Manufacturers": {
    key: "foodManufacturers",
    icon: "factory",
  },
  "Food Service Companies": {
    key: "foodService",
    icon: "service",
  },
  Distributors: {
    key: "distributors",
    icon: "distribution",
  },
} as const;

type ApplicationIconName =
  (typeof applicationConfig)[keyof typeof applicationConfig]["icon"];

function ApplicationIcon({
  icon,
}: {
  icon: ApplicationIconName;
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "import") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="m15 9-3 3 3 3" />
      </svg>
    );
  }

  if (icon === "wholesale") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 7h16v13H4Z" />
        <path d="M7 4h10l3 3H4l3-3Z" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (icon === "store") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 10v10h16V10" />
        <path d="M3 10 5 4h14l2 6" />
        <path d="M8 20v-6h8v6" />
        <path d="M3 10c1.2 1.3 2.5 1.3 4 0 1.3 1.3 2.7 1.3 4 0 1.3 1.3 2.7 1.3 4 0 1.5 1.3 2.8 1.3 4 0" />
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

  if (icon === "service") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 18h16" />
        <path d="M6 18a6 6 0 0 1 12 0" />
        <path d="M12 7V4" />
        <path d="M9 4h6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h10v10H4Z" />
      <path d="M14 10h3l3 3v4h-6" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

export function ProductApplications({
  applications,
}: ProductApplicationsProps) {
  const t = useTranslations(
    "products.detailSections.applications"
  );

  const visibleApplications = applications.flatMap(
    (item) => {
      const config =
        applicationConfig[
          item as keyof typeof applicationConfig
        ];

      return config ? [config] : [];
    }
  );

  if (visibleApplications.length === 0) {
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleApplications.map((item, index) => (
            <article
              key={item.key}
              className="group flex h-full items-center gap-5 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800 transition duration-300 group-hover:bg-green-800 group-hover:text-white">
                <ApplicationIcon icon={item.icon} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold tracking-[0.12em] text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7 text-gray-950">
                  {t(`items.${item.key}`)}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}