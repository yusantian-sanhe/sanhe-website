"use client";

import { useTranslations } from "next-intl";

export function Statistics() {
  const t = useTranslations("statistics");

  const stats = [
    {
      value: t("items.years.value"),
      label: t("items.years.label"),
    },
    {
      value: t("items.markets.value"),
      label: t("items.markets.label"),
    },
    {
      value: t("items.shipments.value"),
      label: t("items.shipments.label"),
    },
    {
      value: t("items.partners.value"),
      label: t("items.partners.label"),
    },
  ];

  return (
    <section className="bg-green-800 px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-5xl font-extrabold">{stat.value}</div>
            <p className="mt-3 text-green-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}