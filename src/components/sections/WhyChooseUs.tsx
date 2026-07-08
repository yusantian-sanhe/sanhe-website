import { Card, Container, Heading, Section } from "@/components/ui";

export function WhyChooseUs() {
  const advantages = [
    {
      title: "Self-owned Planting Bases",
      description:
        "Key products including ginger, garlic, onion, green onion and carrot are sourced directly from our own planting bases for reliable quality and stable supply.",
    },
    {
      title: "Factory Direct Processing",
      description:
        "Cleaning, grading, processing and packing are managed through our own production facilities to ensure consistent quality.",
    },
    {
      title: "Self-owned Cold Chain Warehousing",
      description:
        "Professional cold storage preserves freshness and supports efficient export logistics.",
    },
    {
      title: "Full Product Traceability",
      description:
        "Every shipment can be traced from planting and processing through packing and export.",
    },
    {
      title: "Customized Packaging & OEM",
      description:
        "Flexible packaging, private label and OEM production are available to meet customer requirements.",
    },
    {
      title: "Stable Year-round Supply",
      description:
        "Integrated supply chain management helps ensure reliable supply throughout the year.",
    },
  ];

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow="Why SanHe"
title="Why Global Buyers Choose SanHe"
          description="SanHe combines planting, processing, cold chain management and international export experience to provide reliable agricultural supply chain solutions for customers worldwide."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <Card key={item.title}>
              <h3 className="text-2xl font-bold text-gray-950">{item.title}</h3>

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