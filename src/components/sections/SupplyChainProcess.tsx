import { Card, Container, Heading, Section } from "@/components/ui";

export function SupplyChainProcess() {
  const steps = [
    {
      number: "01",
      title: "Self-owned Planting Bases",
      description: "Stable quality managed from the source.",
    },
    {
      number: "02",
      title: "Factory Processing",
      description: "Cleaning, grading and customized processing.",
    },
    {
      number: "03",
      title: "Cold Chain Warehousing",
      description: "Freshness preserved before shipment.",
    },
    {
      number: "04",
      title: "Quality Inspection & Packaging",
      description: "Products prepared to customer specifications.",
    },
    {
      number: "05",
      title: "Global Export",
      description: "Reliable delivery to worldwide markets.",
    },
  ];

  return (
    <Section>
      <Container>
        <Heading
          align="center"
          eyebrow="Supply Chain"
          title="From Our Fields to Global Markets"
          description="Every shipment is managed through our integrated supply chain, from self-owned planting bases to global delivery, ensuring freshness, quality and full traceability."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <Card key={step.number}>
              <div className="text-sm font-bold text-green-700">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-gray-600">
          By integrating planting, processing, cold storage and export
          logistics, Harvest helps customers reduce supply risks and build
          long-term partnerships.
        </p>
      </Container>
    </Section>
  );
}