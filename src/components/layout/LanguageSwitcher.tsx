"use client";

import { localeConfig, locales, type Locale } from "@/i18n/locales";
import { useParams, usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = String(params.locale || "en") as Locale;

  function getLocalizedPath(locale: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return (
    <select
      value={currentLocale}
      dir="ltr"
      onChange={(event) => {
        router.push(getLocalizedPath(event.target.value as Locale));
      }}
      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeConfig[locale].nativeName}
        </option>
      ))}
    </select>
  );
}