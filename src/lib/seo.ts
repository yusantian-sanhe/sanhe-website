import type { Metadata } from "next";
import { SEO } from "@/constants/seo";
import {
  defaultLocale,
  locales,
} from "@/i18n/locales";
import type { Product } from "@/features/products/types";

interface MetadataOptions {
  title?: string;
  description?: string;

  /**
   * 当前页面路径，包含 locale。
   *
   * 例如：
   * /en/products/fresh-vegetables/fresh-ginger
   */
  path?: string;

  /**
   * 不包含 locale 的公共路径。
   *
   * 例如：
   * /products/fresh-vegetables/fresh-ginger
   */
  alternatePath?: string;

  image?: string;
  locale?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

function normalizePath(path: string) {
  const trimmedPath = path.trim();

  if (!trimmedPath || trimmedPath === "/") {
    return "";
  }

  return trimmedPath.startsWith("/")
    ? trimmedPath
    : `/${trimmedPath}`;
}

export function createAbsoluteUrl(path = "") {
  if (
    path.startsWith("https://") ||
    path.startsWith("http://")
  ) {
    return path;
  }

  return `${SEO.siteUrl}${normalizePath(path)}`;
}

function createLanguageAlternates(
  alternatePath: string
) {
  const normalizedPath =
    normalizePath(alternatePath);

  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = createAbsoluteUrl(
      `/${locale}${normalizedPath}`
    );
  }

  languages["x-default"] = createAbsoluteUrl(
    `/${defaultLocale}${normalizedPath}`
  );

  return languages;
}

function getOpenGraphLocale(locale?: string) {
  if (
    locale &&
    locale in SEO.localeMap
  ) {
    return SEO.localeMap[
      locale as keyof typeof SEO.localeMap
    ];
  }

  return SEO.localeMap[defaultLocale];
}

function getAlternateOpenGraphLocales(
  locale?: string
) {
  return locales
    .filter((item) => item !== locale)
    .map(
      (item) =>
        SEO.localeMap[
          item as keyof typeof SEO.localeMap
        ]
    );
}

export function generatePageMetadata({
  title,
  description = SEO.defaultDescription,
  path = "",
  alternatePath,
  image = SEO.ogImage,
  locale = defaultLocale,
  type = "website",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? SEO.titleTemplate.replace("%s", title)
    : SEO.defaultTitle;

  const canonicalUrl =
    createAbsoluteUrl(path);

  const imageUrl =
    createAbsoluteUrl(image);

  const robotsValue = noIndex
    ? "noindex, nofollow"
    : "index, follow";

  return {
    title: pageTitle,
    description,
    keywords: [...SEO.keywords],

    alternates: {
      canonical: canonicalUrl,

      ...(alternatePath !== undefined
        ? {
            languages:
              createLanguageAlternates(
                alternatePath
              ),
          }
        : {}),
    },

    robots: robotsValue,

    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: SEO.siteName,
      locale: getOpenGraphLocale(locale),
      alternateLocale:
        getAlternateOpenGraphLocales(locale),
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ?? SEO.siteName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * 旧版兼容函数。
 *
 * 当前页面优先直接使用 generatePageMetadata。
 */
export function generateProductMetadata(
  product: Product
): Metadata {
  const productPath =
    `/products/${product.categorySlug}/${product.slug}`;

  return generatePageMetadata({
    title: `${product.name} Supplier`,
    description:
      `${product.description} SanHe supports global buyers with ` +
      "planting base management, factory processing, cold chain warehousing, " +
      "OEM and private label services.",
    path: `/${defaultLocale}${productPath}`,
    alternatePath: productPath,
    image: product.image,
    locale: defaultLocale,
  });
}