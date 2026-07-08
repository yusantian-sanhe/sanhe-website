import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import { productCategories } from "@/features/products/data";

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow="Products"
            title="Fresh Produce, Frozen Foods & Prepared Food Solutions"
            description="Explore our main product categories, including fresh vegetables, fresh fruits, frozen foods and prepared foods for global buyers."
            className="text-white"
          />
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {productCategories.map((category) => (
              <Card key={category.slug}>
                <div className="mb-6 text-5xl">
                  {category.slug === "fresh-vegetables" && "🥬"}
                  {category.slug === "fresh-fruits" && "🍎"}
                  {category.slug === "frozen-foods" && "❄️"}
                  {category.slug === "prepared-foods" && "🍱"}
                </div>

                <h2 className="text-3xl font-bold">{category.name}</h2>

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

      <Footer />
    </main>
  );
}