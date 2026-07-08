import { ReactNode } from "react";

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: HeadingProps) {
  const alignment =
    align === "center"
      ? "text-center"
      : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-widest text-green-700">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}