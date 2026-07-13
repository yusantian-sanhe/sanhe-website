"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button, Container, Heading, Section } from "@/components/ui";

const marketItems = [
  {
    key: "middleEast",
    position: "left-[59%] top-[48%]",
  },
  {
    key: "europe",
    position: "left-[48%] top-[31%]",
  },
  {
    key: "asia",
    position: "left-[71%] top-[39%]",
  },
  {
    key: "africa",
    position: "left-[49%] top-[58%]",
  },
  {
    key: "americas",
    position: "left-[20%] top-[42%]",
  },
] as const;

function WorldMapIllustration() {
  return (
    <svg
      viewBox="0 0 1000 520"
      className="h-full w-full"
      role="img"
      aria-label="Global export markets map"
    >
      <defs>
        <linearGradient
          id="map-fill"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>

        <radialGradient id="map-glow">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="500"
        cy="270"
        rx="450"
        ry="210"
        fill="url(#map-glow)"
      />

      <g
        fill="url(#map-fill)"
        stroke="#16a34a"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.95"
      >
        <path d="M110 128 160 96l66 9 42 34 25 54-20 47-56 5-34 46-51-10-28-53 17-44-11-56Z" />

        <path d="m224 293 39 13 29 47-5 61-27 62-34-18-15-64 12-50 1-51Z" />

        <path d="m419 126 51-20 63 12 29 25-7 35-48 13-26 34-59-7-29-33 26-59Z" />

        <path d="m490 214 48-12 51 35 21 57-19 75-48 49-34-25-8-63-37-49 26-67Z" />

        <path d="m560 139 91-28 121 16 78 46 14 66-52 24-58-17-45 27-68-23-20-41-70-13 9-57Z" />

        <path d="m774 350 49-15 48 22 19 48-29 35-56-1-30-35-1-54Z" />

        <path d="m351 97 20-16 19 13-8 28-25 2-6-27Z" />

        <path d="m865 230 23-7 18 16-12 23-27-6-2-26Z" />
      </g>

      <g
        fill="none"
        stroke="#15803d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 10"
        opacity="0.65"
      >
        <path d="M210 220 C330 140 430 150 520 220" />
        <path d="M520 220 C610 170 700 190 770 235" />
        <path d="M520 220 C500 290 510 330 540 365" />
        <path d="M770 235 C800 300 820 335 835 380" />
      </g>

      <g fill="#166534">
        <circle cx="210" cy="220" r="7" />
        <circle cx="500" cy="170" r="7" />
        <circle cx="595" cy="250" r="7" />
        <circle cx="540" cy="340" r="7" />
        <circle cx="770" cy="235" r="7" />
      </g>
    </svg>
  );
}

export function ExportMarkets() {
  const locale = useLocale();
  const t = useTranslations("exportMarkets");

  return (
    <Section className="overflow-hidden bg-white">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
          <div>
            <Heading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {marketItems.slice(0, 4).map((market, index) => (
                <div
                  key={market.key}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 transition duration-300 hover:border-green-200 hover:bg-green-50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-extrabold tracking-[0.12em] text-green-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-[0_0_0_5px_rgba(34,197,94,0.12)]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-950">
                    {t(`regions.${market.key}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {t(`regions.${market.key}.countries`)}
                  </p>

                  <div className="mt-5 h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={`/${locale}/markets`}>
                {t("eyebrow")}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-5 shadow-xl sm:min-h-[520px] sm:p-8">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-x-0 top-1/4 h-px bg-green-100" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-green-100" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-green-100" />
                <div className="absolute inset-y-0 left-1/4 w-px bg-green-100" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-green-100" />
                <div className="absolute inset-y-0 left-3/4 w-px bg-green-100" />
              </div>

              <div className="relative h-full min-h-[380px] sm:min-h-[460px]">
                <WorldMapIllustration />

                {marketItems.map((market) => (
                  <div
                    key={market.key}
                    className={`absolute ${market.position} -translate-x-1/2 -translate-y-1/2`}
                  >
                    <div className="group relative">
                      <span className="absolute inset-0 animate-ping rounded-full bg-green-500/25 motion-reduce:hidden" />

                      <span className="relative flex h-5 w-5 rounded-full border-4 border-white bg-green-700 shadow-lg" />

                      <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden w-48 -translate-x-1/2 rounded-2xl bg-gray-950 px-4 py-3 text-center text-white shadow-xl group-hover:block">
                        <p className="font-bold">
                          {t(`regions.${market.key}.title`)}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-300">
                          {t(`regions.${market.key}.countries`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg backdrop-blur sm:left-6 sm:right-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-700">
                        {t("eyebrow")}
                      </p>

                      <p className="mt-1 font-semibold text-gray-950">
                        {t("description")}
                      </p>
                    </div>

                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {marketItems.map((market) => (
                        <span
                          key={market.key}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-100 text-xs font-bold text-green-800"
                        >
                          {t(`regions.${market.key}.title`).slice(0, 1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-green-100/70 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {marketItems.map((market, index) => (
            <article
              key={market.key}
              className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-gray-50 p-6 transition duration-300 motion-safe:hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="h-3 w-3 rounded-full bg-green-600 shadow-[0_0_0_6px_rgba(34,197,94,0.12)]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-950">
                {t(`regions.${market.key}.title`)}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-gray-600">
                {t(`regions.${market.key}.countries`)}
              </p>

              <div className="mt-7 h-1 w-10 rounded-full bg-green-700 transition-all duration-300 group-hover:w-16" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}