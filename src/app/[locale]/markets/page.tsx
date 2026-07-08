import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, Container, Heading, Section } from "@/components/ui";

export default function MarketsPage() {
  const markets = [
    {
      title: "Middle East",
      description:
        "Supplying buyers in UAE, Saudi Arabia, Qatar, Kuwait and surrounding markets.",
    },
    {
      title: "Europe",
      description:
        "Supporting importers and distributors across Germany, France, Spain, Italy and other European markets.",
    },
    {
      title: "Asia",
      description:
        "Working with regional buyers, distributors and food processors across Asia.",
    },
    {
      title: "Africa",
      description:
        "Serving selected food import markets across North Africa and West Africa.",
    },
    {
      title: "Americas",
      description:
        "Supporting wholesale and import channels in North America and Latin America.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <Section className="bg-green-900 text-white">
        <Container>
          <Heading
            align="center"
            eyebrow="Export Markets"
            title="Serving Global Agricultural Import Markets"
            description="We support buyers across key international markets with reliable product supply, export documentation and logistics coordination."
            className="text-white"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Global Reach"
            title="Markets We Support"
            description="Our export service is built for importers, wholesalers, distributors and food manufacturers worldwide."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {markets.map((market) => (
              <Card key={market.title}>
                <div className="mb-6 text-4xl">🌍</div>

                <h3 className="text-2xl font-bold">{market.title}</h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {market.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}