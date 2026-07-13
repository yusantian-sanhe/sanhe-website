import { SEO } from "@/constants/seo";
import { createAbsoluteUrl } from "@/lib/seo";

interface ProductStructuredDataProps {
  locale: string;
  categorySlug: string;
  categoryName: string;
  productSlug: string;
  productName: string;
  productDescription: string;
  images: string[];
  specifications: string[];
  packaging: string;
  moq: string;
  supplyAbility: string;
  loadingCapacity: string;

  /**
   * 可选的本地化面包屑名称。
   *
   * 当前页面不传也可以正常工作。
   */
  homeLabel?: string;
  productsLabel?: string;
}

const FALLBACK_IMAGE = "/logo-icon.png";
const ORGANIZATION_ID = `${SEO.siteUrl}#organization`;

function normalizeText(value: string) {
  return value.trim();
}

function createProductImages(images: string[]) {
  const validImages = images
    .filter(
      (image): image is string =>
        typeof image === "string" &&
        image.trim().length > 0
    )
    .map((image) =>
      createAbsoluteUrl(image.trim())
    );

  const uniqueImages = Array.from(
    new Set(validImages)
  );

  return uniqueImages.length > 0
    ? uniqueImages
    : [createAbsoluteUrl(FALLBACK_IMAGE)];
}

function createAdditionalProperties({
  specifications,
  packaging,
  moq,
  supplyAbility,
  loadingCapacity,
}: {
  specifications: string[];
  packaging: string;
  moq: string;
  supplyAbility: string;
  loadingCapacity: string;
}) {
  const specificationProperties =
    specifications
      .map(normalizeText)
      .filter(Boolean)
      .map((specification, index) => ({
        "@type": "PropertyValue",
        name: `Specification ${index + 1}`,
        value: specification,
      }));

  const tradeProperties = [
    {
      name: "Packaging",
      value: normalizeText(packaging),
    },
    {
      name: "Minimum Order Quantity",
      value: normalizeText(moq),
    },
    {
      name: "Supply Ability",
      value: normalizeText(supplyAbility),
    },
    {
      name: "Loading Capacity",
      value: normalizeText(loadingCapacity),
    },
  ]
    .filter((item) => item.value.length > 0)
    .map((item) => ({
      "@type": "PropertyValue",
      name: item.name,
      value: item.value,
    }));

  return [
    ...specificationProperties,
    ...tradeProperties,
  ];
}

export function ProductStructuredData({
  locale,
  categorySlug,
  categoryName,
  productSlug,
  productName,
  productDescription,
  images,
  specifications,
  packaging,
  moq,
  supplyAbility,
  loadingCapacity,
  homeLabel = SEO.siteName,
  productsLabel = "Products",
}: ProductStructuredDataProps) {
  const normalizedProductName =
    normalizeText(productName);

  const normalizedDescription =
    normalizeText(productDescription);

  const normalizedCategoryName =
    normalizeText(categoryName);

  const homeUrl = createAbsoluteUrl(
    `/${locale}`
  );

  const productsUrl = createAbsoluteUrl(
    `/${locale}/products`
  );

  const categoryUrl = createAbsoluteUrl(
    `/${locale}/products/${categorySlug}`
  );

  const productUrl = createAbsoluteUrl(
    `/${locale}/products/${categorySlug}/${productSlug}`
  );

  const productImages =
    createProductImages(images);

  const additionalProperty =
    createAdditionalProperties({
      specifications,
      packaging,
      moq,
      supplyAbility,
      loadingCapacity,
    });

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
          url: createAbsoluteUrl(
            "/logo-icon.png"
          ),
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: homeLabel,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: productsLabel,
            item: productsUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: normalizedCategoryName,
            item: categoryUrl,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: normalizedProductName,
            item: productUrl,
          },
        ],
      },

      {
        "@type": "ItemPage",
        "@id": `${productUrl}#webpage`,
        url: productUrl,
        name: normalizedProductName,
        description: normalizedDescription,
        inLanguage: locale,

        breadcrumb: {
          "@id": `${productUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${productUrl}#product`,
        },

        isPartOf: {
          "@id": `${SEO.siteUrl}#website`,
        },

        about: {
          "@id": `${productUrl}#product`,
        },
      },

      {
        "@type": "Product",
        "@id": `${productUrl}#product`,

        name: normalizedProductName,
        description: normalizedDescription,
        url: productUrl,
        image: productImages,

        sku: productSlug,
        category: normalizedCategoryName,
        inLanguage: locale,

        mainEntityOfPage: {
          "@id": `${productUrl}#webpage`,
        },

        brand: {
          "@type": "Brand",
          name: SEO.siteName,
        },

        manufacturer: {
          "@id": ORGANIZATION_ID,
        },

        ...(additionalProperty.length > 0
          ? {
              additionalProperty,
            }
          : {}),
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