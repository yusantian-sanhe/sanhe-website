import { Button, Container, Section } from "@/components/ui";

interface ProductInquiryCTAProps {
  locale: string;
  productName: string;
}

export function ProductInquiryCTA({
  locale,
  productName,
}: ProductInquiryCTAProps) {
  return (
    <Section className="bg-green-800 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-green-100">
            Request a Quote
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
            Interested in {productName}?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
            Contact our export team to discuss specifications, packaging,
            quantity, OEM, private label or mixed container requirements.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["OEM", "Private Label", "Customized Packaging", "Mixed Containers"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-green-400 px-4 py-2 text-sm font-medium text-green-100"
                >
                  ✓ {item}
                </span>
              )
            )}
          </div>

          <div className="mt-10">
            <Button href={`/${locale}/contact`} variant="secondary">
              Request a Quote
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}