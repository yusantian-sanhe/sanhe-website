import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductAdvantages } from "@/components/products/ProductAdvantages";
import { ProductApplications } from "@/components/products/ProductApplications";
import { ProductDetailHero } from "@/components/products/ProductDetailHero";
import { ProductInquiryCTA } from "@/components/products/ProductInquiryCTA";
import { ProductPackaging } from "@/components/products/ProductPackaging";
import { ProductQualityAssurance } from "@/components/products/ProductQualityAssurance";
import { ProductStructuredData } from "@/components/products/ProductStructuredData";
import { ProductSupplyCapability } from "@/components/products/ProductSupplyCapability";
import { RelatedProducts } from "@/components/products/RelatedProducts";

import {
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "@/features/products/data";

import { generatePageMetadata } from "@/lib/seo";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{
    locale: string;
    category: string;
    product: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps) {
  const { locale, category, product } = await params;

  const currentCategory = getCategoryBySlug(category);
  const currentProduct = getProductBySlug(product);

  if (
    !currentCategory ||
    !currentProduct ||
    currentProduct.categorySlug !== currentCategory.slug
  ) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  const productPath = `/products/${category}/${product}`;

  return generatePageMetadata({
    title: t(`items.${product}.name`),
    description: t(`items.${product}.description`),
    path: `/${locale}${productPath}`,
    alternatePath: productPath,
    image: currentProduct.image,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, category, product } = await params;

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  const navigation = await getTranslations({
    locale,
    namespace: "navigation",
  });

  const currentCategory = getCategoryBySlug(category);
  const currentProduct = getProductBySlug(product);

  if (!currentCategory || !currentProduct) {
    notFound();
  }

  if (currentProduct.categorySlug !== currentCategory.slug) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(
    currentCategory.slug
  )
    .filter((item) => item.slug !== currentProduct.slug)
    .slice(0, 4);

  const categoryName = t(
    `categories.${category}.name`
  );

  const productName = t(
    `items.${product}.name`
  );

  const productDescription = t(
    `items.${product}.description`
  );

  const productDetails = t(
    `items.${product}.details`
  );

  const specifications =
    currentProduct.specifications.map((_, index) =>
      t(`items.${product}.specifications.${index}`)
    );

  const packaging = t(
    `items.${product}.packaging`
  );

  const moq = t(
    `items.${product}.moq`
  );

  const supplyAbility = t(
    `items.${product}.supplyAbility`
  );

  const loadingCapacity = t(
    `items.${product}.loadingCapacity`
  );

  const productInfoRows = [
    {
      label: t("detail.packaging"),
      value: packaging,
    },
    {
      label: t("detail.moq"),
      value: moq,
    },
    {
      label: t("detail.supplyAbility"),
      value: supplyAbility,
    },
    {
      label: t("detail.loadingCapacity"),
      value: loadingCapacity,
    },
  ];

  const qualityAssuranceItems = [
    {
      icon: "inspection" as const,
      title: t(
        "detailSections.qualityAssurance.items.inspection.title"
      ),
      description: t(
        "detailSections.qualityAssurance.items.inspection.description"
      ),
    },
    {
      icon: "foodSafety" as const,
      title: t(
        "detailSections.qualityAssurance.items.foodSafety.title"
      ),
      description: t(
        "detailSections.qualityAssurance.items.foodSafety.description"
      ),
    },
    {
      icon: "traceability" as const,
      title: t(
        "detailSections.qualityAssurance.items.traceability.title"
      ),
      description: t(
        "detailSections.qualityAssurance.items.traceability.description"
      ),
    },
    {
      icon: "coldChain" as const,
      title: t(
        "detailSections.qualityAssurance.items.coldChain.title"
      ),
      description: t(
        "detailSections.qualityAssurance.items.coldChain.description"
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <ProductStructuredData
        locale={locale}
        categorySlug={currentCategory.slug}
        categoryName={categoryName}
        productSlug={currentProduct.slug}
        productName={productName}
        productDescription={productDescription}
        images={currentProduct.images}
        specifications={specifications}
        packaging={packaging}
        moq={moq}
        supplyAbility={supplyAbility}
        loadingCapacity={loadingCapacity}
      />

      <Header />

      <ProductDetailHero
        locale={locale}
        categorySlug={currentCategory.slug}
        categoryName={categoryName}
        productName={productName}
        productDescription={productDescription}
        productDetails={productDetails}
        images={currentProduct.images}
        specifications={specifications}
        productInfoRows={productInfoRows}
        backLabel={t("backToCategory", {
          category: categoryName,
        })}
        overviewLabel={t("detail.overview")}
        specificationsLabel={t(
          "detail.specifications"
        )}
        quoteLabel={navigation("quote")}
        productsLabel={navigation("products")}
      />

      <ProductPackaging
        packagingOptions={
          currentProduct.packagingOptions ?? []
        }
      />

      {currentProduct.advantages &&
        currentProduct.advantages.length > 0 && (
          <ProductAdvantages
            advantages={currentProduct.advantages}
          />
        )}

      <ProductSupplyCapability
        capabilities={
          currentProduct.supplyCapabilities ?? []
        }
      />

      <ProductQualityAssurance
        eyebrow={t(
          "detailSections.qualityAssurance.eyebrow"
        )}
        title={t(
          "detailSections.qualityAssurance.title"
        )}
        description={t(
          "detailSections.qualityAssurance.description"
        )}
        items={qualityAssuranceItems}
      />

      <ProductApplications
        applications={
          currentProduct.applications ?? []
        }
      />

      <RelatedProducts
        locale={locale}
        products={relatedProducts}
      />

      <ProductInquiryCTA
        locale={locale}
        productName={productName}
      />

      <Footer />
    </main>
  );
}