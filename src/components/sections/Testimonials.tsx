"use client";

import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      name: t("items.importer.name"),
      company: t("items.importer.company"),
      content: t("items.importer.content"),
    },
    {
      name: t("items.distributor.name"),
      company: t("items.distributor.company"),
      content: t("items.distributor.content"),
    },
    {
      name: t("items.processor.name"),
      company: t("items.processor.company"),
      content: t("items.processor.content"),
    },
  ];

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-green-700">
            {t("eyebrow")}
          </span>

          <h2 className="mt-4 text-4xl font-bold">{t("title")}</h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-100 p-8 shadow-sm"
            >
              <div className="text-xl text-yellow-500">★★★★★</div>

              <p className="mt-6 leading-7 text-gray-600">
                “{item.content}”
              </p>

              <div className="mt-8">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}