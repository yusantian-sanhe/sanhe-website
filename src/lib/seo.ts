import { Metadata } from "next";
import { SEO } from "@/constants/seo";
import { Product } from "@/features/products/data";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description = SEO.defaultDescription,
  path = "",
  image = SEO.ogImage,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? SEO.titleTemplate.replace("%s", title)
    : SEO.defaultTitle;

  const url = `${SEO.siteUrl}${path}`;

  return {
    title: pageTitle,
    description,
    keywords: [...SEO.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SEO.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SEO.siteName,
        },
      ],
      type: "website",
    },
  };
}

export function generateProductMetadata(product: Product): Metadata {
  return generatePageMetadata({
    title: `${product.name} Supplier`,
    description: `${product.description} Harvest Food Group supports global buyers with own planting bases, factory processing, cold chain warehousing, OEM and private label services.`,
    path: `/products/${product.categorySlug}/${product.slug}`,
    image: product.image,
  });
}