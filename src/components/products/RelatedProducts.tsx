"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import type { Product } from "@/features/products/types";

interface RelatedProductsProps {
  locale: string;
  products: Product[];
}

export function RelatedProducts({
  locale,
  products,
}: RelatedProductsProps) {
  const t = useTranslations(
    "products.detailSections.relatedProducts"
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.slug}
              className="group flex h-full flex-col overflow-hidden p-0"
            >
              <div className="relative h-56 overflow-hidden bg-green-100">
                <Image
                  src={product.image}
                  alt={t(`items.${product.slug}.name`)}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1280px)50vw,25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100">
                    {t("eyebrow")}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {t(`items.${product.slug}.name`)}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="flex-1 leading-7 text-gray-600">
                  {t(`items.${product.slug}.description`)}
                </p>

                <div className="mt-8">
                  <Button
                    href={`/${locale}/products/${product.categorySlug}/${product.slug}`}
                  >
                    {t("viewProduct")}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}