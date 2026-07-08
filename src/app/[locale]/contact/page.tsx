import { InquiryForm } from "@/components/contact/InquiryForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";
import { company } from "@/constants/company";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow="Request a Quote"
            title="Tell Us Your Sourcing Requirements"
            description="Share your product, packaging, quantity and destination market requirements. Our export team will help you prepare a suitable supply solution."
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <h2 className="text-3xl font-bold">Inquiry Form</h2>

             <InquiryForm />
            </Card>

            <div className="space-y-6">
              <Card>
                <h3 className="text-2xl font-bold">Export Team</h3>
                <div className="mt-6 space-y-4 text-gray-600">
                  <p>Email: {company.email}</p>
                  <p>Phone: {company.phone}</p>
                  <p>WhatsApp: {company.whatsapp}</p>
                  <p>Address: {company.address}</p>
                  <p>Response Time: {company.responseTime}</p>
                </div>
              </Card>

              <Card className="bg-green-50">
  <h3 className="text-2xl font-bold">
    Why Global Buyers Choose Harvest
  </h3>

  <ul className="mt-6 space-y-4 text-gray-700">
    <li>✓ Own planting bases for key products</li>
    <li>✓ Factory processing and export packing</li>
    <li>✓ Self-owned cold chain warehousing</li>
    <li>✓ Full quality traceability</li>
    <li>✓ OEM, private label and mixed containers</li>
    <li>✓ SGS / HACCP / BRC certification support</li>
  </ul>
</Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}