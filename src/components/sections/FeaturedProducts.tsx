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
    image: "/images/categories/fresh-vegetables.jpg",
  },
  {
    key: "freshFruits",
    slug: "fresh-fruits",
    image: "/images/categories/fresh-fruits.jpg",
  },
  {
    key: "frozenFoods",
    slug: "frozen-foods",
    image: "/images/categories/frozen-foods.jpg",
  },
  {
    key: "preparedFoods",
    slug: "prepared-foods",
    image: "/images/categories/prepared-foods.jpg",
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredItems.map((item) => {
            const productName = t(`items.${item.key}.name`);
            const productDescription = t(
              `items.${item.key}.description`
            );

            return (
              <Card
                key={item.slug}
                className="group flex h-full flex-col overflow-hidden p-0 transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-green-100">
                  <Image
                    src={item.image}
                    alt={productName}
                    fill
                    quality={88}
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1279px) 50vw,
                      25vw
                    "
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                    {t("eyebrow")}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight text-gray-950">
                    {productName}
                  </h3>

                  <p className="mt-4 line-clamp-3 flex-1 leading-7 text-gray-600">
                    {productDescription}
                  </p>

                  <div className="mt-6">
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