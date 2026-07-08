import { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  };
}