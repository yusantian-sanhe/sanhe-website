import { Card, Container, Heading, Section } from "@/components/ui";

interface ProductAdvantagesProps {
  advantages: {
    title: string;
    description: string;
  }[];
}

export function ProductAdvantages({ advantages }: ProductAdvantagesProps) {
  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow="Product Advantages"
          title="Why This Product Works for Global Buyers"
          description="Each product is supported by SanHe's controlled supply chain, export experience and customer-focused service."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
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