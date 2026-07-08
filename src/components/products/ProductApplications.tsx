import { Card, Container, Heading, Section } from "@/components/ui";

interface ProductApplicationsProps {
  applications: string[];
}

export function ProductApplications({
  applications,
}: ProductApplicationsProps) {
  if (applications.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <Heading
          align="center"
          eyebrow="Applications"
          title="Suitable for Different Buyer Needs"
          description="This product is suitable for importers, wholesalers, supermarkets, food manufacturers and food service companies."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((item) => (
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