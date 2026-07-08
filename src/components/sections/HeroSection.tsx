"use client";

import { useLocale } from "next-intl";
import { Button, Container, Section } from "@/components/ui";

export function HeroSection() {
  const locale = useLocale();

  const trustItems = [
    {
      title: "Self-owned Planting Bases",
      description: "Reliable quality managed from the source.",
    },
    {
      title: "Factory Direct Processing",
      description: "Professional grading, processing and packaging.",
    },
    {
      title: "Self-owned Cold Chain",
      description: "Maintaining freshness during storage and export.",
    },
    {
      title: "Full Product Traceability",
      description: "Every shipment can be traced from planting to delivery.",
    },
  ];

  const process = [
    "Planting Bases",
    "Factory Processing",
    "Cold Chain Storage",
    "Global Export",
  ];

  return (
    <Section className="bg-gradient-to-b from-green-50 to-white">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-green-700">
              From Our Fields To Global Markets
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-950 md:text-6xl">
              Reliable Fresh Produce & Frozen Food Supply Chain Solutions
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
              Harvest is a China-based supplier of fresh vegetables, fresh
              fruits, frozen foods and prepared food solutions. Backed by
              self-owned planting bases, factory-direct processing, self-owned
              cold chain warehousing and full product traceability, we provide
              reliable, customized and year-round supply solutions for customers
              worldwide.
            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row">
              <Button href={`/${locale}/products`}>Explore Products</Button>

              <Button href={`/${locale}/contact`} variant="outline">
                Request a Quote
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-2xl font-bold text-gray-950">
              Integrated Supply Chain
            </h2>

            <div className="mt-8 space-y-5">
              {process.map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {index + 1}
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-semibold text-gray-800">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-950">{item.title}</h3>

              <p className="mt-3 leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}