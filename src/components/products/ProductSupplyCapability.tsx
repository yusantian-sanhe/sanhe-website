import { Card, Container, Heading, Section } from "@/components/ui";

interface ProductSupplyCapabilityProps {
  capabilities: string[];
}

export function ProductSupplyCapability({
  capabilities,
}: ProductSupplyCapabilityProps) {
  if (capabilities.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <Container>
        <Heading
          align="center"
          eyebrow="Supply Capability"
          title="Reliable Supply for Global Buyers"
          description="SanHe integrates planting, processing, cold chain warehousing and export service to support stable international supply."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item} className="h-full">
              <div className="flex items-center gap-3">
                <span className="text-xl text-green-600">✓</span>
                <span className="font-semibold text-gray-900">{item}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}