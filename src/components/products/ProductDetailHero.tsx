import { ProductGallery } from "@/components/sections/ProductGallery";
import { Button, Container, Section } from "@/components/ui";
import Link from "next/link";

interface ProductInfoRow {
  label: string;
  value: string;
}

interface ProductDetailHeroProps {
  locale: string;
  categorySlug: string;
  categoryName: string;
  productName: string;
  productDescription: string;
  productDetails: string;
  images: string[];
  specifications: string[];
  productInfoRows: ProductInfoRow[];

  backLabel: string;
  overviewLabel: string;
  specificationsLabel: string;
  quoteLabel: string;
  productsLabel: string;
}

export function ProductDetailHero({
  locale,
  categorySlug,
  categoryName,
  productName,
  productDescription,
  productDetails,
  images,
  specifications,
  productInfoRows,
  backLabel,
  overviewLabel,
  specificationsLabel,
  quoteLabel,
  productsLabel,
}: ProductDetailHeroProps) {
  const inquiryUrl =
    `/${locale}/contact?product=${encodeURIComponent(productName)}`;

  return (
    <>
      <Section className="overflow-hidden bg-green-950 pb-16 pt-10 text-white lg:pb-24">
        <Container>
          <Link
            href={`/${locale}/products/${categorySlug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-100 transition hover:text-white"
          >
            <span
              className="rtl:rotate-180"
              aria-hidden="true"
            >
              ←
            </span>

            <span>{backLabel}</span>
          </Link>

          <div className="mt-10 grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div>
              <ProductGallery
                name={productName}
                images={images}
              />
            </div>

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-200">
                {categoryName}
              </p>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {productName}
              </h1>

              <p className="mt-6 text-lg leading-8 text-green-100">
                {productDescription}
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-200">
                  {overviewLabel}
                </p>

                <p className="mt-4 leading-8 text-green-50">
                  {productDetails}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {productInfoRows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-200">
                      {label}
                    </p>

                    <p className="mt-3 font-semibold leading-7 text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button
                  href={inquiryUrl}
                  variant="secondary"
                >
                  {quoteLabel}
                </Button>

                <Button
                  href={`/${locale}/products`}
                  className="border border-green-300 bg-transparent text-white hover:bg-white/10"
                >
                  {productsLabel}
                </Button>
              </div>

              <div
                className="pointer-events-none absolute -right-24 -top-20 -z-10 h-72 w-72 rounded-full bg-green-700/30 blur-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                {overviewLabel}
              </p>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl">
                {specificationsLabel}
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                {productDetails}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {specifications.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:border-green-200 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800 transition group-hover:bg-green-800 group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="pt-1 font-semibold leading-7 text-gray-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}