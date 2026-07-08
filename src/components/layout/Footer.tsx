"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { company } from "@/constants/company";
import { productCategories } from "@/features/products/data";
import { Container, Section } from "@/components/ui";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="bg-gray-950 text-white">
      <Section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
            <div>
              <Link href={`/${locale}`} className="inline-flex items-center">
  <Image
    src="/logo-header.png"
    alt="SanHe International Food Supply Chain"
    width={260}
    height={65}
    className="h-14 w-auto"
  />
</Link>

              <p className="mt-5 max-w-md leading-7 text-gray-400">
                {company.slogan}
              </p>

              <p className="mt-6 text-sm text-gray-500">{company.address}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-white">Company</h3>
                <ul className="mt-5 space-y-3 text-sm text-gray-400">
                  <li>
                    <Link href={`/${locale}/about`} className="hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/quality`} className="hover:text-white">
                      Quality
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/markets`} className="hover:text-white">
                      Markets
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">Products</h3>
                <ul className="mt-5 space-y-3 text-sm text-gray-400">
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${locale}/products/${category.slug}`}
                        className="hover:text-white"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">Contact</h3>
                <ul className="mt-5 space-y-3 text-sm text-gray-400">
                  <li>
                    <a href={`mailto:${company.email}`} className="hover:text-white">
                      {company.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${company.phone}`} className="hover:text-white">
                      {company.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8 text-sm text-gray-500">
            {company.copyright}
          </div>
        </Container>
      </Section>
    </footer>
  );
}