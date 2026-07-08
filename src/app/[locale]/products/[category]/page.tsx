import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/features/products/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductCategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { locale, category } = await params;

  const currentCategory = getCategoryBySlug(category);

  if (!currentCategory) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Link
            href={`/${locale}/products`}
            className="text-sm font-semibold text-green-100 hover:text-white"
          >
            ← Back To Products
          </Link>

          <Heading
            className="mt-10 text-white"
            eyebrow="Product Category"
            title={currentCategory.name}
            description={currentCategory.description}
          />
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.slug}>
                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl bg-green-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm font-semibold uppercase text-green-700">
                  {product.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6">
                  <Button
                    href={`/${locale}/products/${category}/${product.slug}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}