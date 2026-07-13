import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductPackaging } from "@/components/products/ProductPackaging";
import { ProductSupplyCapability } from "@/components/products/ProductSupplyCapability";
import {
  Button,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";
import {
  getCategoryBySlug,
  getProductsByCategory,
  productCategories,
} from "@/features/products/data";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductCategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

const categoryImages: Record<string, string> = {
  "fresh-vegetables":
    "/products/categories/fresh-vegetables.jpg",
  "fresh-fruits":
    "/products/categories/fresh-fruits.jpg",
  "frozen-foods":
    "/products/categories/frozen-foods.jpg",
  "prepared-foods":
    "/products/categories/prepared-foods.jpg",
};

const defaultPackagingOptions = [
  "10kg Carton",
  "13.6kg Carton",
  "Mesh Bag",
  "Customized Packaging",
  "Private Label",
];

const defaultSupplyCapabilities = [
  "Own Planting Bases",
  "Factory Direct Processing",
  "Cold Chain Warehousing",
  "Full Product Traceability",
  "OEM & Private Label",
  "Mixed Container Service",
];

export async function generateMetadata({
  params,
}: ProductCategoryPageProps) {
  const { locale, category } = await params;

  const currentCategory = getCategoryBySlug(category);

  if (!currentCategory) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  const categoryPath = `/products/${category}`;

  return generatePageMetadata({
    title: t(`categories.${category}.name`),
    description: t(
      `categories.${category}.description`
    ),
    path: `/${locale}${categoryPath}`,
    alternatePath: categoryPath,
    image:
      categoryImages[category] ??
      "/images/og-image.jpg",
  });
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { locale, category } = await params;

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  const navigation = await getTranslations({
    locale,
    namespace: "navigation",
  });

  const currentCategory = getCategoryBySlug(category);

  if (!currentCategory) {
    notFound();
  }

  const products = getProductsByCategory(category);

  const relatedCategories = productCategories.filter(
    (item) => item.slug !== category
  );

  const categoryName = t(
    `categories.${category}.name`
  );

  const categoryDescription = t(
    `categories.${category}.description`
  );

  const categoryImage =
    categoryImages[category] ??
    "/logo-icon.png";

  const categoryPackagingOptions =
    products.find(
      (product) =>
        product.packagingOptions &&
        product.packagingOptions.length > 0
    )?.packagingOptions ??
    defaultPackagingOptions;

  const categorySupplyCapabilities =
    products.find(
      (product) =>
        product.supplyCapabilities &&
        product.supplyCapabilities.length > 0
    )?.supplyCapabilities ??
    defaultSupplyCapabilities;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="overflow-hidden bg-green-950 text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative z-10">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-100 transition hover:text-white"
              >
                <span
                  className="rtl:rotate-180"
                  aria-hidden="true"
                >
                  ←
                </span>

                <span>{t("backToProducts")}</span>
              </Link>

              <div className="mt-10">
                <Heading
                  eyebrow={t("categoryEyebrow")}
                  title={categoryName}
                  description={categoryDescription}
                  className="text-white"
                />
              </div>

              {products.length > 0 && (
                <div className="mt-9 flex flex-wrap gap-3">
                  {products.slice(0, 4).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/${locale}/products/${category}/${product.slug}`}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-green-100 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      {t(`items.${product.slug}.name`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="group relative min-h-[360px] overflow-hidden rounded-[34px] bg-green-800 shadow-2xl sm:min-h-[460px]">
                <Image
                  src={categoryImage}
                  alt={categoryName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-100">
                    {t("categoryEyebrow")}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {categoryName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
              {t("categoryEyebrow")}
            </p>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-950">
              {categoryName}
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {categoryDescription}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const productName = t(
                  `items.${product.slug}.name`
                );

                const productDescription = t(
                  `items.${product.slug}.description`
                );

                return (
                  <Card
                    key={product.slug}
                    className="group flex h-full flex-col overflow-hidden p-0 transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      href={`/${locale}/products/${category}/${product.slug}`}
                      className="relative block h-64 overflow-hidden bg-green-100"
                      aria-label={productName}
                    >
                      <Image
                        src={product.image}
                        alt={productName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="text-2xl font-bold text-gray-950">
                        {productName}
                      </h3>

                      <p className="mt-4 flex-1 leading-7 text-gray-600">
                        {productDescription}
                      </p>

                      <div className="mt-7">
                        <Button
                          href={`/${locale}/products/${category}/${product.slug}`}
                        >
                          {t("viewDetails")}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="mt-14 text-center">
              <p className="text-gray-600">
                {categoryDescription}
              </p>
            </Card>
          )}
        </Container>
      </Section>

      <ProductPackaging
        packagingOptions={categoryPackagingOptions}
      />

      <ProductSupplyCapability
        capabilities={categorySupplyCapabilities}
      />

      <Section className="bg-white">
        <Container>
          <Heading
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedCategories.map((relatedCategory) => {
              const relatedName = t(
                `categories.${relatedCategory.slug}.name`
              );

              const relatedDescription = t(
                `categories.${relatedCategory.slug}.description`
              );

              return (
                <Card
                  key={relatedCategory.slug}
                  className="flex h-full flex-col"
                >
                  <h3 className="text-2xl font-bold text-gray-950">
                    {relatedName}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-gray-600">
                    {relatedDescription}
                  </p>

                  <Link
                    href={`/${locale}/products/${relatedCategory.slug}`}
                    className="mt-7 inline-flex items-center gap-2 font-semibold text-green-700"
                  >
                    {t("viewCategory")}

                    <span
                      className="rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-green-900 text-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              {t("categoryEyebrow")}
            </p>

            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              {categoryName}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              {categoryDescription}
            </p>

            <div className="mt-10">
              <Button
                href={`/${locale}/contact`}
                variant="secondary"
              >
                {navigation("quote")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}