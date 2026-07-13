import { NextIntlClientProvider } from "next-intl";
import {
  getLocaleConfig,
  isLocale,
} from "@/i18n/locales";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

async function loadOptionalMessages(
  locale: string,
  file: string
) {
  try {
    return (
      await import(
        `../../messages/${locale}/${file}.json`
      )
    ).default;
  } catch {
    return {};
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [
    common,
    home,
    products,
    footer,
    about,
    markets,
    quality,
    contact,
  ] = await Promise.all([
    loadOptionalMessages(locale, "common"),
    loadOptionalMessages(locale, "home"),
    loadOptionalMessages(locale, "products"),
    loadOptionalMessages(locale, "footer"),
    loadOptionalMessages(locale, "about"),
    loadOptionalMessages(locale, "markets"),
    loadOptionalMessages(locale, "quality"),
    loadOptionalMessages(locale, "contact"),
  ]);

  const messages = {
    ...common,
    ...home,
    ...products,
    ...footer,
    ...about,
    ...markets,
    ...quality,
    ...contact,
  };

  const config =
    getLocaleConfig(locale);

  return (
    <div
      lang={locale}
      dir={config.dir}
      className="flex min-h-full flex-1 flex-col"
    >
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </div>
  );
}