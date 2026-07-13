"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Button,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";

const featuredItems = [
  {
    key: "freshVegetables",
    slug: "fresh-vegetables",
    image: "/products/categories/fresh-vegetables.jpg",
  },
  {
    key: "freshFruits",
    slug: "fresh-fruits",
    image: "/products/categories/fresh-fruits.jpg",
  },
  {
    key: "frozenFoods",
    slug: "frozen-foods",
    image: "/products/categories/frozen-foods.jpg",
  },
  {
    key: "preparedFoods",
    slug: "prepared-foods",
    image: "/products/categories/prepared-foods.jpg",
  },
] as const;

export function FeaturedProducts() {
  const locale = useLocale();
  const t = useTranslations("featuredProducts");

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {featuredItems.map((item) => {
            const productName = t(`items.${item.key}.name`);
            const productDescription = t(
              `items.${item.key}.description`
            );

            return (
              <Card
                key={item.slug}
                className="group flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden bg-green-100 sm:h-80">
                  <Image
                    src={item.image}
                    alt={productName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-100">
                      {t("eyebrow")}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {productName}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="flex-1 leading-7 text-gray-600">
                    {productDescription}
                  </p>

                  <div className="mt-8">
                    <Button
                      href={`/${locale}/products/${item.slug}`}
                      aria-label={`${t("learnMore")}: ${productName}`}
                    >
                      {t("learnMore")}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}