"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import { productCategories } from "@/features/products/data";

export function FeaturedProducts() {
  const t = useTranslations("featuredProducts");
  const locale = useLocale();

  const icons: Record<string, string> = {
    "fresh-vegetables": "🥬",
    "fresh-fruits": "🍎",
    "frozen-foods": "❄️",
    "prepared-foods": "🍱",
  };

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow={t("eyebrow")}
          title="Fresh Produce & Food Solutions"
          description="Explore our core product categories, including fresh vegetables, fresh fruits, frozen foods and prepared food solutions."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {productCategories.map((category) => (
            <Card key={category.slug}>
              <div className="mb-6 text-5xl">{icons[category.slug]}</div>

              <h3 className="text-3xl font-bold">{category.name}</h3>

              <p className="mt-5 leading-7 text-gray-600">
                {category.description}
              </p>

              <div className="mt-8">
                <Button href={`/${locale}/products/${category.slug}`}>
                  View Category
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}