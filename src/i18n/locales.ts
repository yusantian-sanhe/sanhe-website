export type Locale =
  | "en"
  | "zh"
  | "ru"
  | "ar"
  | "es"
  | "fr";

export const defaultLocale: Locale =
  "en";

export const locales = [
  "en",
  "zh",
  "ru",
  "ar",
  "es",
  "fr",
] as const;

export const localeConfig: Record<
  Locale,
  {
    name: string;
    nativeName: string;
    dir: "ltr" | "rtl";
  }
> = {
  en: {
    name: "English",
    nativeName: "English",
    dir: "ltr",
  },

  zh: {
    name: "Chinese",
    nativeName: "中文",
    dir: "ltr",
  },

  ru: {
    name: "Russian",
    nativeName: "Русский",
    dir: "ltr",
  },

  ar: {
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
  },

  es: {
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
  },

  fr: {
    name: "French",
    nativeName: "Français",
    dir: "ltr",
  },
};

export function isLocale(
  value: string
): value is Locale {
  return locales.includes(
    value as Locale
  );
}

export function getLocaleConfig(
  locale: Locale
) {
  return localeConfig[locale];
}