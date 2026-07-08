import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container, Section } from "@/components/ui";
import { company } from "@/constants/company";

export default function ContactSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-100">
              Inquiry Received
            </p>

            <h1 className="mt-6 text-5xl font-extrabold">
              Thank You for Your Inquiry
            </h1>

            <p className="mt-6 text-lg leading-8 text-green-100">
              Our export team has received your request and will contact you
              within {company.responseTime}.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/en/products"
                className="rounded-full bg-white px-6 py-3 font-semibold text-green-800 hover:bg-green-50"
              >
                Browse More Products
              </Link>

              <Link
                href="/en"
                className="rounded-full border border-green-200 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}