import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductAdvantages } from "@/components/products/ProductAdvantages";
import { ProductApplications } from "@/components/products/ProductApplications";
import { ProductPackaging } from "@/components/products/ProductPackaging";
import { ProductSupplyCapability } from "@/components/products/ProductSupplyCapability";
import { ProductInquiryCTA } from "@/components/products/ProductInquiryCTA";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { Card, Container, Heading, Section } from "@/components/ui";
import {
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "@/features/products/data";
import { generateProductMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedProducts } from "@/components/products/RelatedProducts";
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
  const { product } = await params;

  const currentProduct = getProductBySlug(product);

  if (!currentProduct) {
    return {};
  }

  return generateProductMetadata(currentProduct);
}
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, category, product } = await params;

  const currentCategory = getCategoryBySlug(category);
  const currentProduct = getProductBySlug(product);

  if (!currentCategory || !currentProduct) {
    notFound();
  }

  if (currentProduct.categorySlug !== currentCategory.slug) {
  notFound();
}

const relatedProducts = getProductsByCategory(currentCategory.slug)
  .filter((item) => item.slug !== currentProduct.slug)
  .slice(0, 4);
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Link
            href={`/${locale}/products/${currentCategory.slug}`}
            className="text-sm font-semibold text-green-100 hover:text-white"
          >
            ← Back To {currentCategory.name}
          </Link>

          <Heading
            className="mt-10 text-white"
            eyebrow={currentCategory.name}
            title={currentProduct.name}
            description={currentProduct.description}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <ProductGallery
              name={currentProduct.name}
              images={currentProduct.images}
            />

            <div>
              <Heading
                eyebrow="Product Overview"
                title="Export Information"
                description={currentProduct.details}
              />

              <Card className="mt-10 bg-gray-50">
                <h3 className="text-2xl font-bold">Specifications</h3>

                <ul className="mt-6 space-y-4">
                  {currentProduct.specifications.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl bg-white px-5 py-4 shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="mt-10 grid gap-5">
                {[
                  ["Packaging", currentProduct.packaging],
                  ["MOQ", currentProduct.moq],
                  ["Supply Ability", currentProduct.supplyAbility],
                  ["Loading Capacity", currentProduct.loadingCapacity],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-6 rounded-2xl border p-5"
                  >
                    <span className="font-semibold">{label}</span>
                    <span className="text-right text-gray-600">{value}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </Container>
      </Section>

<ProductPackaging
  packagingOptions={currentProduct.packagingOptions ?? []}
/>

{currentProduct.advantages && (
  <ProductAdvantages advantages={currentProduct.advantages} />
)}

<ProductSupplyCapability
  capabilities={currentProduct.supplyCapabilities ?? []}
/>

<ProductApplications
  applications={currentProduct.applications ?? []}
/>

<RelatedProducts locale={locale} products={relatedProducts} />

<ProductInquiryCTA
  locale={locale}
  productName={currentProduct.name}
/>
      <Footer />
    </main>
  );
}