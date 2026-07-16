const fallbackSiteUrl =
  "https://www.sanhefood.com.cn";

function normalizeSiteUrl(
  value: string
) {
  return value
    .trim()
    .replace(/\/+$/, "");
}

export const SEO = {
  siteName: "SanHe",

  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      fallbackSiteUrl
  ),

  defaultTitle:
    "SanHe | Global Agricultural Food Supplier",

  titleTemplate:
    "%s | SanHe",

  defaultDescription:
    "SanHe supplies fresh vegetables, fresh fruits, frozen foods and prepared food solutions to global importers, wholesalers and food manufacturers.",

  keywords: [
    "agricultural products supplier",
    "fresh vegetables supplier",
    "fresh fruits supplier",
    "frozen food supplier",
    "prepared food supplier",
    "fresh ginger supplier",
    "fresh garlic exporter",
    "fresh onion supplier",
    "OEM food supplier",
    "private label food supplier",
    "China agricultural exporter",
  ],

  ogImage:
    "/opengraph-image",

  localeMap: {
    en: "en_US",
    zh: "zh_CN",
    ru: "ru_RU",
    ar: "ar_AR",
    es: "es_ES",
    fr: "fr_FR",
  },
} as const;