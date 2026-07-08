import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";

export default function QualityPage() {
  const steps = [
    "Supplier Selection",
    "Product Inspection",
    "Packing Control",
    "Export Documentation",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow="Quality Control"
            title="Reliable Standards for Export Trade"
            description="We support buyers with quality-focused sourcing, inspection coordination, export packing and documentation support."
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Our Process"
            title="How We Control Product Quality"
            description="Every order is handled with attention to product consistency, packing requirements and export compliance."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step}>
                <div className="mb-6 text-4xl font-extrabold text-green-700">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold">{step}</h3>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Card>
              <h3 className="text-2xl font-bold">Export Packing</h3>
              <p className="mt-4 leading-7 text-gray-600">
                We coordinate packing according to buyer requirements, product
                characteristics and destination market needs.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold">Documentation Support</h3>
              <p className="mt-4 leading-7 text-gray-600">
                We support commercial documents, packing lists, inspection
                coordination and other export-related requirements.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}