import { Card, Container, Heading, Section } from "@/components/ui";

interface ProductPackagingProps {
  packagingOptions: string[];
}

export function ProductPackaging({
  packagingOptions,
}: ProductPackagingProps) {
  if (packagingOptions.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <Container>
        <Heading
          align="center"
          eyebrow="Packaging"
          title="Available Packaging Options"
          description="Flexible packaging solutions are available to meet different market requirements and customer preferences."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packagingOptions.map((item) => (
            <Card key={item} className="h-full">
              <div className="flex items-center gap-3">
                <span className="text-xl text-green-600">✓</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}