"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { company } from "@/constants/company";
import { productCategories } from "@/features/products/data";
import { Container, Section } from "@/components/ui";

export function Footer() {
  const locale = useLocale();

  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const productsT = useTranslations("products");

  const phoneHref = `tel:${company.phone.replace(/\s+/g, "")}`;
  const whatsappNumber = company.whatsapp.replace(/[^\d]/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-gray-950 text-white">
      <Section className="py-16">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[1.2fr_2fr]">
            <div>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center"
                aria-label={t("homeLabel")}
              >
                <Image
                  src="/logo-header.png"
                  alt="SanHe International Food Supply Chain"
                  width={260}
                  height={65}
                  className="h-14 w-auto"
                />
              </Link>

              <p className="mt-6 max-w-md leading-7 text-gray-400">
                {t("description")}
              </p>

              <div className="mt-7 space-y-3 text-sm text-gray-400">
                <p className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-green-400"
                    aria-hidden="true"
                  >
                    ●
                  </span>

                  <span>{company.address}</span>
                </p>

                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <span
                    className="text-green-400"
                    aria-hidden="true"
                  >
                    ✉
                  </span>

                  <span>{company.email}</span>
                </a>

                <a
                  href={phoneHref}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <span
                    className="text-green-400"
                    aria-hidden="true"
                  >
                    ☎
                  </span>

                  <span>{company.phone}</span>
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                  {t("company")}
                </h3>

                <ul className="mt-6 space-y-4 text-sm text-gray-400">
                  <li>
                    <Link
                      href={`/${locale}/about`}
                      className="transition hover:text-white"
                    >
                      {nav("about")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${locale}/quality`}
                      className="transition hover:text-white"
                    >
                      {nav("quality")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${locale}/markets`}
                      className="transition hover:text-white"
                    >
                      {nav("markets")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${locale}/contact`}
                      className="transition hover:text-white"
                    >
                      {nav("contact")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                  {t("products")}
                </h3>

                <ul className="mt-6 space-y-4 text-sm text-gray-400">
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${locale}/products/${category.slug}`}
                        className="transition hover:text-white"
                      >
                        {productsT(
                          `categories.${category.slug}.name`
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                  {t("contact")}
                </h3>

                <ul className="mt-6 space-y-4 text-sm text-gray-400">
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="transition hover:text-white"
                    >
                      {t("email")}
                    </a>
                  </li>

                  <li>
                    <a
                      href={phoneHref}
                      className="transition hover:text-white"
                    >
                      {t("phone")}
                    </a>
                  </li>

                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-white"
                    >
                      {t("whatsapp")}
                    </a>
                  </li>

                  {company.linkedin && (
                    <li>
                      <a
                        href={company.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-white"
                      >
                        {t("linkedin")}
                      </a>
                    </li>
                  )}
                </ul>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    {t("quoteTitle")}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t("quoteDescription")}
                  </p>

                  <Link
                    href={`/${locale}/contact`}
                    className="mt-4 inline-flex rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                  >
                    {t("quoteButton")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>{company.copyright}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href={`/${locale}/about`}
                className="transition hover:text-gray-300"
              >
                {t("about")}
              </Link>

              <Link
                href={`/${locale}/quality`}
                className="transition hover:text-gray-300"
              >
                {t("quality")}
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="transition hover:text-gray-300"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}