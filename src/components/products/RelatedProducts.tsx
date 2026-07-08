import Link from "next/link";
import { Card, Container, Heading, Section } from "@/components/ui";
import { Product } from "@/features/products/data";

interface RelatedProductsProps {
  locale: string;
  products: Product[];
}

export function RelatedProducts({
  locale,
  products,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow="Related Products"
          title="You May Also Be Interested In"
          description="Explore more products from the same category."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.slug} className="h-full">
              <h3 className="text-xl font-bold">
                {product.name}
              </h3>

              <p className="mt-4 text-gray-600">
                {product.description}
              </p>

              <Link
                href={`/${locale}/products/${product.categorySlug}/${product.slug}`}
                className="mt-6 inline-block font-semibold text-green-700 hover:text-green-800"
              >
                View Product →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}