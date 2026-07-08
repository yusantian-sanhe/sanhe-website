import { Card, Container, Heading, Section } from "@/components/ui";

export function Certificates() {
  const items = [
    {
      title: "SGS",
      description: "Third-party inspection support for international buyers.",
    },
    {
      title: "HACCP",
      description: "Food safety management for processing and export control.",
    },
    {
      title: "BRC",
      description: "International standard support for food supply chains.",
    },
    {
      title: "Full Traceability",
      description: "Products can be traced from planting to final shipment.",
    },
    {
      title: "Cold Chain Management",
      description: "Temperature-controlled storage helps preserve freshness.",
    },
    {
      title: "Quality Inspection",
      description: "Inspection and packing control before export shipment.",
    },
  ];

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow="Quality & Certifications"
          title="Building Trust Through Quality Control"
          description="Harvest supports global buyers with recognized certification standards, traceable supply chains, cold chain warehousing and export-focused quality inspection."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="h-full">
              <h3 className="text-2xl font-bold text-gray-950">
                {item.title}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}