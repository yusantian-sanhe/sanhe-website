import { SEO } from "@/constants/seo";
import { createAbsoluteUrl } from "@/lib/seo";

const ORGANIZATION_ID =
  `${SEO.siteUrl}#organization`;

const WEBSITE_ID =
  `${SEO.siteUrl}#website`;

export function SiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,

        name: SEO.siteName,
        url: SEO.siteUrl,

        logo: {
          "@type": "ImageObject",
          "@id": `${SEO.siteUrl}#logo`,
          url: createAbsoluteUrl(
            "/logo-icon.png"
          ),
          contentUrl: createAbsoluteUrl(
            "/logo-icon.png"
          ),
          caption: SEO.siteName,
        },

        image: {
          "@id": `${SEO.siteUrl}#logo`,
        },

        description:
          SEO.defaultDescription,
      },

      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,

        url: SEO.siteUrl,
        name: SEO.siteName,
        description:
          SEO.defaultDescription,

        publisher: {
          "@id": ORGANIZATION_ID,
        },

        inLanguage: [
          "en",
          "zh",
          "ru",
          "ar",
          "es",
          "fr",
        ],
      },
    ],
  };

  const jsonLd = JSON.stringify(
    structuredData
  ).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
    />
  );
}