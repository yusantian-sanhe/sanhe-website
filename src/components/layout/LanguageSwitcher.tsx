"use client";

import {
  localeConfig,
  locales,
  type Locale,
} from "@/i18n/locales";
import { useLocale } from "next-intl";
import {
  usePathname,
  useRouter,
} from "next/navigation";

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({
  compact = false,
}: LanguageSwitcherProps) {
  const currentLocale =
    useLocale() as Locale;

  const pathname = usePathname();
  const router = useRouter();

  const currentDirection =
    localeConfig[currentLocale].dir;

  function getLocalizedPath(
    locale: Locale
  ) {
    const segments = pathname
      .split("/")
      .filter(Boolean);

    if (segments.length === 0) {
      return `/${locale}`;
    }

    if (
      locales.includes(
        segments[0] as Locale
      )
    ) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }

    return `/${segments.join("/")}`;
  }

  function handleLocaleChange(
    locale: Locale
  ) {
    const localizedPath =
      getLocalizedPath(locale);

    const search =
      typeof window !== "undefined"
        ? window.location.search
        : "";

    router.push(
      `${localizedPath}${search}`
    );
  }

  const selectId = compact
    ? "mobile-language"
    : "desktop-language";

  return (
    <div
      className="relative"
      dir={currentDirection}
    >
      <label
        htmlFor={selectId}
        className="sr-only"
      >
        Select language
      </label>

      <div className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-gray-500">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-2"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
          />

          <path d="M3 12h18" />

          <path d="M12 3a15 15 0 0 1 0 18" />

          <path d="M12 3a15 15 0 0 0 0 18" />
        </svg>
      </div>

      <select
        id={selectId}
        value={currentLocale}
        dir={currentDirection}
        aria-label="Select language"
        onChange={(event) =>
          handleLocaleChange(
            event.target.value as Locale
          )
        }
        className={`appearance-none rounded-full border border-gray-200 bg-white font-semibold text-gray-700 outline-none transition hover:border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
          compact
            ? "h-11 w-16 py-2 pe-2 ps-8 text-xs"
            : "py-2.5 pe-9 ps-9 text-sm"
        }`}
      >
        {locales.map((locale) => (
          <option
            key={locale}
            value={locale}
            dir={
              localeConfig[locale].dir
            }
          >
            {compact
              ? locale.toUpperCase()
              : localeConfig[locale]
                  .nativeName}
          </option>
        ))}
      </select>

      {!compact && (
        <div className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-gray-400">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2"
            aria-hidden="true"
          >
            <path d="m7 10 5 5 5-5" />
          </svg>
        </div>
      )}
    </div>
  );
}