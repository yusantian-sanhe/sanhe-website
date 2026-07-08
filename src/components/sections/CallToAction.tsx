import { Button, Container, Heading, Section } from "@/components/ui";

export function CallToAction() {
  const highlights = [
    "OEM Production",
    "Private Label",
    "Mixed Containers",
    "Stable Year-round Supply",
  ];

  return (
    <Section className="bg-green-800 text-white">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <Heading
            align="center"
            eyebrow="START COOPERATION"
            title="Ready to Build a Reliable Supply Chain?"
            description="Harvest works with importers, wholesalers, supermarkets and food manufacturers worldwide. Contact our export team to discuss products, customized packaging, OEM production or long-term cooperation."
            className="text-white"
          />

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-green-400 px-4 py-2 text-sm font-medium text-green-100"
              >
                ✓ {item}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/en/contact">
              Request a Quote
            </Button>

            <Button href="/en/products" variant="secondary">
              Explore Products
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}