import type { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";

function isProductionDeployment() {
  const vercelEnvironment =
    process.env.VERCEL_ENV;

  /*
   * On Vercel, only the Production deployment
   * should be indexable. Preview and Development
   * deployments must remain blocked.
   */
  if (vercelEnvironment) {
    return vercelEnvironment === "production";
  }

  /*
   * Fallback for non-Vercel production hosting.
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

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/*/contact/success",
      ],
    },

    sitemap: `${SEO.siteUrl}/sitemap.xml`,

    host: SEO.siteUrl,
  };
}