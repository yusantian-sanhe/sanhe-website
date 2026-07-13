"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";

const statisticItems = [
  "stages",
  "categories",
  "languages",
  "service",
] as const;

export function HeroStatistics() {
  const t = useTranslations("statistics");

  return (
    <section className="border-y border-green-100 bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-green-100 md:grid-cols-4 md:divide-y-0 rtl:divide-x-reverse">
          {statisticItems.map((item) => (
            <div
              key={item}
              className="group px-5 py-9 text-center sm:px-8"
            >
              <p className="text-4xl font-extrabold tracking-tight text-green-800 transition group-hover:-translate-y-0.5 sm:text-5xl">
                {t(`items.${item}.value`)}
              </p>

              <p className="mx-auto mt-3 max-w-[180px] text-sm font-semibold leading-6 text-gray-600 sm:text-base">
                {t(`items.${item}.label`)}
              </p>

              <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}