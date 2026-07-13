import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductsCapabilities } from "@/components/products/ProductsCapabilities";
import {
  Button,
  Container,
  Heading,
  Section,
} from "@/components/ui";
import {
  getProductsByCategory,
  productCategories,
} from "@/features/products/data";
import { generatePageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

interface ProductsPageProps {
  params: Promise<{
    locale: string;
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

export async function generateMetadata({
  params,
}: ProductsPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/products`,
    alternatePath: "/products",
  });
}

export default async function ProductsPage({
  params,
}: ProductsPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "products",
  });

  const navigation = await getTranslations({
    locale,
    namespace: "navigation",
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="text-white"
          />
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <nav
            aria-label={t("categoryEyebrow")}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {productCategories.map((category, index) => {
              const categoryName = t(
                `categories.${category.slug}.name`
              );

              return (
                <Link
                  key={category.slug}
                  href={`/${locale}/products/${category.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-sm font-extrabold text-green-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-bold text-gray-950 transition group-hover:text-green-800">
                    {categoryName}
                  </span>

                  <span
                    className="ms-auto text-lg font-bold text-green-700 rtl:rotate-180"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      {productCategories.map((category, categoryIndex) => {
        const categoryName = t(
          `categories.${category.slug}.name`
        );

        const categoryDescription = t(
          `categories.${category.slug}.description`
        );

        const categoryImage =
          categoryImages[category.slug] ??
          "/logo-icon.png";

        const previewProducts = getProductsByCategory(
          category.slug
        ).slice(0, 3);

        const isReversed = categoryIndex % 2 === 1;

        return (
          <Section
            key={category.slug}
            className={
              categoryIndex % 2 === 0
                ? "bg-white"
                : "bg-gray-50"
            }
          >
            <Container>
              <div
                className={`grid gap-10 xl:items-center ${
                  isReversed
                    ? "xl:grid-cols-[1.1fr_0.9fr]"
                    : "xl:grid-cols-[0.9fr_1.1fr]"
                }`}
              >
                <div className={isReversed ? "xl:order-2" : ""}>
                  <div className="group relative min-h-[340px] overflow-hidden rounded-[32px] bg-green-100 shadow-xl sm:min-h-[440px]">
                    <Image
                      src={categoryImage}
                      alt={categoryName}
                      fill
                      sizes="(max-width: 1280px) 100vw, 45vw"
                      className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                    <div className="absolute bottom-7 left-7 right-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-100">
                        {t("categoryEyebrow")}
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        {categoryName}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className={isReversed ? "xl:order-1" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                    {t("categoryEyebrow")}
                  </p>

                  <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-950">
                    {categoryName}
                  </h2>

                  <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                    {categoryDescription}
                  </p>

                  <div className="mt-8">
                    <Button
                      href={`/${locale}/products/${category.slug}`}
                    >
                      {t("viewCategory")}
                    </Button>
                  </div>

                  {previewProducts.length > 0 && (
                    <div className="mt-10 grid gap-4">
                      {previewProducts.map((product) => {
                        const productName = t(
                          `items.${product.slug}.name`
                        );

                        const productDescription = t(
                          `items.${product.slug}.description`
                        );

                        return (
                          <Link
                            key={product.slug}
                            href={`/${locale}/products/${category.slug}/${product.slug}`}
                            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:border-green-200 hover:shadow-md"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-green-100">
                              <Image
                                src={product.image}
                                alt={productName}
                                fill
                                sizes="64px"
                                className="object-cover transition duration-500 group-hover:scale-105"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-gray-950 transition group-hover:text-green-800">
                                {productName}
                              </h3>

                              <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                                {productDescription}
                              </p>
                            </div>

                            <span
                              className="shrink-0 font-bold text-green-700 rtl:rotate-180"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <ProductsCapabilities />

      <Section className="bg-green-900 text-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              {t("eyebrow")}
            </p>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("title")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              {t("description")}
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