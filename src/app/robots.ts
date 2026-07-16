import type { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";
import { locales } from "@/i18n/locales";

function isProductionDeployment() {
  const vercelEnvironment =
    process.env.VERCEL_ENV;

  /*
   * Vercel Preview 和 Development 部署
   * 不允许被搜索引擎索引。
   */
  if (vercelEnvironment) {
    return vercelEnvironment === "production";
  }

  /*
   * 非 Vercel 托管环境的生产模式回退。
   */
  return process.env.NODE_ENV === "production";
}

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const localizedSuccessPages =
    locales.map(
      (locale) =>
        `/${locale}/contact/success`
    );

  return {
    rules: {
      userAgent: "*",
      allow: "/",

      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        ...localizedSuccessPages,
      ],
    },

    sitemap:
      `${SEO.siteUrl}/sitemap.xml`,

    host: SEO.siteUrl,
  };
}