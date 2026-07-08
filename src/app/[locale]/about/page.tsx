import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";

export default function AboutPage() {
  const advantages = [
    "Reliable Product Sourcing",
    "Export-Ready Packing",
    "Quality Control Support",
    "Long-Term Cooperation",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow="About Harvest"
            title="Trusted Agricultural Export Partner"
            description="We support global buyers with selected agricultural products, stable supply chains and professional export service."
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Heading
                eyebrow="Who We Are"
                title="Building Reliable Global Supply Relationships"
                description="Harvest works with production and processing partners to supply agricultural products for importers, wholesalers, distributors and food manufacturers worldwide."
              />

              <p className="mt-6 leading-8 text-gray-600">
                From product selection and quality checking to export packing
                and shipment coordination, we focus on helping buyers reduce
                risk and build long-term sourcing partnerships.
              </p>
            </div>

            <div className="flex h-[420px] items-center justify-center rounded-3xl bg-green-100 text-7xl">
              🌾
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <Heading
            align="center"
            eyebrow="Our Strengths"
            title="Why Buyers Work With Us"
            description="We combine product knowledge, supplier coordination and export service to support international agricultural trade."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {advantages.map((item) => (
              <Card key={item}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold">{item}</h3>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-green-800 text-white">
        <Container>
          <div className="grid gap-10 text-center md:grid-cols-4">
            {[
              ["10+", "Years Experience"],
              ["30+", "Markets Served"],
              ["1,000+", "Export Shipments"],
              ["200+", "Business Partners"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-5xl font-extrabold">{value}</div>
                <p className="mt-3 text-green-100">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}