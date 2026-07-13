import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "./locales";

async function loadOptionalMessages(locale: string, file: string) {
  try {
    return (await import(`../messages/${locale}/${file}.json`)).default;
  } catch {
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale =
    requested && isLocale(requested)
      ? requested
      : defaultLocale;

  const common = await loadOptionalMessages(locale, "common");
  const products = await loadOptionalMessages(locale, "products");
  const footer = await loadOptionalMessages(locale, "footer");
  const about = await loadOptionalMessages(locale, "about");
  const markets = await loadOptionalMessages(locale, "markets");
  const quality = await loadOptionalMessages(locale, "quality");
  const contact = await loadOptionalMessages(locale, "contact");
  const home = await loadOptionalMessages(locale, "home");
  console.log("LOADED HOME:", home);
  const messages = {
  ...common,
  ...products,
  ...footer,
  ...about,
  ...markets,
  ...quality,
  ...contact,
  ...home,
};

  console.log(
  "FINAL MESSAGES KEYS:",
  Object.keys(messages)
);

console.log(
  "FEATURED:",
  messages.featuredProducts
);

return {
  locale,
  messages,
};
});