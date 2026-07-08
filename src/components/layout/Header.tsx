"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("navigation");
  const params = useParams();
  const locale = String(params.locale || "en");

  const navItems = [
    { label: t("home"), href: `/${locale}` },
    { label: t("products"), href: `/${locale}/products` },
    { label: t("markets"), href: `/${locale}/markets` },
    { label: t("quality"), href: `/${locale}/quality` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  return (
    <header className="border-b border-gray-100 bg-white">
      <Container className="flex h-20 items-center justify-between">
       <Link
  href={`/${locale}`}
  className="flex items-center"
>
  <Image
    src="/logo-header.png"
    alt="SanHe International Food Supply Chain"
    width={220}
    height={60}
    priority
    className="h-12 w-auto"
  />
</Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {t("quote")}
          </Link>
        </div>
      </Container>
    </header>
  );
}