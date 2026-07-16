import type { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";
import {
  productCategories,
  products,
} from "@/features/products/data";
import {
  defaultLocale,
  locales,
  type Locale,
} from "@/i18n/locales";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface RouteDefinition {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

function normalizePath(
  path: string
) {
  if (!path) {
    return "";
  }

  return path.startsWith("/")
    ? path
    : `/${path}`;
}

function createUrl(
  locale: Locale,
  path = ""
) {
  return (
    `${SEO.siteUrl}` +
    `/${locale}` +
    normalizePath(path)
  );
}

function createLanguageAlternates(
  path = ""
) {
  const languages: Record<
    string,
    string
  > = {};

  for (const locale of locales) {
    languages[locale] =
      createUrl(locale, path);
  }

  languages["x-default"] =
    createUrl(
      defaultLocale,
      path
    );

  return languages;
}

function createLocalizedRoutes(
  routes: RouteDefinition[]
): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: createUrl(
        locale,
        route.path
      ),

      alternates: {
        languages:
          createLanguageAlternates(
            route.path
          ),
      },

      changeFrequency:
        route.changeFrequency,

      priority:
        route.priority,
    }))
  );
}

export default function sitemap():
  MetadataRoute.Sitemap {
  const staticRoutes =
    createLocalizedRoutes([
      {
        path: "",
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        path: "/products",
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        path: "/contact",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        path: "/about",
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: "/markets",
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: "/quality",
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ]);

  const categoryRoutes =
    createLocalizedRoutes(
      productCategories.map(
        (category) => ({
          path:
            `/products/${category.slug}`,

          changeFrequency:
            "weekly" as const,

          priority: 0.8,
        })
      )
    );

  const productRoutes =
    createLocalizedRoutes(
      products.map((product) => ({
        path:
          `/products/` +
          `${product.categorySlug}/` +
          `${product.slug}`,

        changeFrequency:
          "weekly" as const,

        priority: 0.7,
      }))
    );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
  ];
}