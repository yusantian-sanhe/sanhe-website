import { Card, Container, Heading, Section } from "@/components/ui";

export function ExportMarkets() {
  const markets = [
    {
      region: "Middle East",
      description:
        "Strong demand for fresh vegetables, frozen foods and customized supply solutions.",
    },
    {
      region: "Europe",
      description:
        "Serving quality-focused markets with products meeting international food safety standards.",
    },
    {
      region: "Central Asia",
      description:
        "Reliable year-round supply supported by efficient logistics and flexible export services.",
    },
    {
      region: "Southeast Asia",
      description:
        "Supporting importers with customized packaging and stable product supply.",
    },
    {
      region: "Africa",
      description:
        "Providing reliable agricultural products for wholesalers and distributors.",
    },
    {
      region: "North America",
      description:
        "Serving food manufacturers, importers and retail supply chains.",
    },
    {
      region: "South America",
      description:
        "Expanding partnerships through reliable export and customized solutions.",
    },
    {
      region: "Oceania",
      description:
        "Supplying fresh and frozen food products for long-term regional partners.",
    },
  ];

  return (
    <Section>
      <Container>
        <Heading
          align="center"
          eyebrow="Global Markets"
          title="Serving Customers Across Global Markets"
          description="Harvest supplies fresh vegetables, fresh fruits, frozen foods and prepared food solutions to importers, wholesalers, supermarkets and food manufacturers around the world."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {markets.map((market) => (
            <Card key={market.region} className="h-full">
              <h3 className="text-2xl font-bold text-gray-950">
                {market.region}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {market.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-center text-lg leading-8 text-gray-600">
          With years of export experience, Harvest understands different market
          requirements, food safety standards, packaging specifications and
          logistics expectations, helping customers build long-term and reliable
          supply partnerships.
        </p>
      </Container>
    </Section>
  );
}