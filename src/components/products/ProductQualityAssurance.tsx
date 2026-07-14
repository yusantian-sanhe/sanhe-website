import {
  Container,
  Heading,
  Section,
} from "@/components/ui";

export interface ProductQualityItem {
  title: string;
  description: string;
  icon:
    | "inspection"
    | "foodSafety"
    | "traceability"
    | "coldChain";
}

interface ProductQualityAssuranceProps {
  eyebrow: string;
  title: string;
  description: string;
  items: ProductQualityItem[];
}

function QualityIcon({
  icon,
}: {
  icon: ProductQualityItem["icon"];
}) {
  const className =
    "h-7 w-7 fill-none stroke-current stroke-2";

  if (icon === "inspection") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M9 4h6" />
        <path d="M9 2h6v4H9Z" />
        <path d="M6 4H5a2 2 0 0 0-2 2v14h18V6a2 2 0 0 0-2-2h-1" />
        <path d="m8 13 2.5 2.5L16 10" />
      </svg>
    );
  }

  if (icon === "foodSafety") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  if (icon === "traceability") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h4a4 4 0 0 1 4 4v6" />
        <path d="m13 13 3 3 3-3" />
        <path d="M6 8v8a2 2 0 0 0 2 2h6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2v20" />
      <path d="m4.2 6.5 15.6 11" />
      <path d="m19.8 6.5-15.6 11" />
      <path d="m9 4 3 3 3-3" />
      <path d="m9 20 3-3 3 3" />
    </svg>
  );
}

export function ProductQualityAssurance({
  eyebrow,
  title,
  description,
  items,
}: ProductQualityAssuranceProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section className="relative overflow-hidden bg-green-950 text-white">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-700/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="relative">
          <Heading
            align="center"
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="mx-auto max-w-3xl [&_h2]:text-white [&_p]:text-green-100"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => (
              <article
                key={`${item.icon}-${item.title}`}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 motion-safe:hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-green-100 transition duration-300 group-hover:bg-white group-hover:text-green-800">
                    <QualityIcon icon={item.icon} />
                  </div>

                  <span className="text-xs font-extrabold tracking-[0.12em] text-green-200">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold leading-8 text-white">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-green-100">
                  {item.description}
                </p>

                <div className="mt-7 h-1 w-10 rounded-full bg-green-300 transition-all duration-300 group-hover:w-16" />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}