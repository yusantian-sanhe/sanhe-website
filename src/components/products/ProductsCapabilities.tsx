"use client";

import { Container, Heading, Section } from "@/components/ui";
import { useTranslations } from "next-intl";

const packagingItems = [
  "tenKgCarton",
  "thirteenSixKgCarton",
  "meshBag",
  "customizedPackaging",
  "privateLabel",
] as const;

const capabilityItems = [
  "plantingBases",
  "factoryProcessing",
  "coldChain",
  "traceability",
  "oemPrivateLabel",
  "mixedContainer",
] as const;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16.5 9" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="m4 7 8 4 8-4" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function SupplyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <path d="M4 21V10l6 3V9l6 3V5h4v16H4Z" />
      <path d="M8 17h2" />
      <path d="M13 17h2" />
      <path d="M18 17h2" />
    </svg>
  );
}

export function ProductsCapabilities() {
  const packaging = useTranslations(
    "products.detailSections.packaging"
  );

  const supply = useTranslations(
    "products.detailSections.supplyCapability"
  );

  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="grid gap-10 xl:grid-cols-2">
          <article className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
            <div className="bg-green-900 p-8 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-green-100">
                <PackageIcon />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-green-200">
                {packaging("eyebrow")}
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                {packaging("title")}
              </h2>

              <p className="mt-5 leading-8 text-green-100">
                {packaging("description")}
              </p>
            </div>

            <div className="grid gap-4 p-7 sm:grid-cols-2">
              {packagingItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <span className="shrink-0 text-green-700">
                    <CheckIcon />
                  </span>

                  <span className="font-semibold text-gray-800">
                    {packaging(`options.${item}`)}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
            <div className="bg-green-800 p-8 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-green-100">
                <SupplyIcon />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-green-200">
                {supply("eyebrow")}
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                {supply("title")}
              </h2>

              <p className="mt-5 leading-8 text-green-100">
                {supply("description")}
              </p>
            </div>

            <div className="grid gap-4 p-7 sm:grid-cols-2">
              {capabilityItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <span className="shrink-0 text-green-700">
                    <CheckIcon />
                  </span>

                  <span className="font-semibold text-gray-800">
                    {supply(`items.${item}`)}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}