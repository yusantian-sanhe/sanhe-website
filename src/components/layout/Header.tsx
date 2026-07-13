"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      key: "home",
      label: t("home"),
      href: `/${locale}`,
    },
    {
      key: "products",
      label: t("products"),
      href: `/${locale}/products`,
    },
    {
      key: "markets",
      label: t("markets"),
      href: `/${locale}/markets`,
    },
    {
      key: "quality",
      label: t("quality"),
      href: `/${locale}/quality`,
    },
    {
      key: "about",
      label: t("about"),
      href: `/${locale}/about`,
    },
    {
      key: "contact",
      label: t("contact"),
      href: `/${locale}/contact`,
    },
  ] as const;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  function isActiveLink(href: string) {
    if (href === `/${locale}`) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center"
            aria-label={t("home")}
          >
            <Image
              src="/logo-header.png"
              alt="SanHe International Food Supply Chain"
              width={220}
              height={60}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-green-50 text-green-800"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-[17px] h-0.5 rounded-full bg-green-700" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <LanguageSwitcher />

            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md"
            >
              {t("quote")}
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher compact />

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800"
            >
              {isMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current stroke-2"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current stroke-2"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 py-5 xl:hidden"
          >
            <nav
              className="grid gap-2"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => {
                const isActive = isActiveLink(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-green-50 text-green-800"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                    }`}
                  >
                    <span>{item.label}</span>

                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-none stroke-current stroke-2"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 border-t border-gray-100 pt-5">
              <Link
                href={`/${locale}/contact`}
                className="flex w-full items-center justify-center rounded-full bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                {t("quote")}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}