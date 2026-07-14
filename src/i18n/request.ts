import { getRequestConfig } from "next-intl/server";
import {
  defaultLocale,
  isLocale,
} from "./locales";

type MessageValue =
  | string
  | number
  | boolean
  | null
  | MessageObject
  | MessageValue[];

interface MessageObject {
  [key: string]: MessageValue;
}

async function loadOptionalMessages(
  locale: string,
  file: string
): Promise<MessageObject> {
  try {
    return (
      await import(
        `../messages/${locale}/${file}.json`
      )
    ).default as MessageObject;
  } catch {
    return {};
  }
}

function isPlainObject(
  value: unknown
): value is MessageObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Locale content overrides the English base.
 * Missing nested keys continue using English.
 *
 * Arrays are replaced as complete values instead
 * of being merged item by item.
 */
function deepMergeMessages(
  base: MessageObject,
  override: MessageObject
): MessageObject {
  const result: MessageObject = {
    ...base,
  };

  for (const [key, overrideValue] of Object.entries(
    override
  )) {
    const baseValue = result[key];

    if (
      isPlainObject(baseValue) &&
      isPlainObject(overrideValue)
    ) {
      result[key] = deepMergeMessages(
        baseValue,
        overrideValue
      );
      continue;
    }

    result[key] = overrideValue;
  }

  return result;
}

async function loadNamespace(
  locale: string,
  file: string
) {
  const englishMessages =
    await loadOptionalMessages("en", file);

  if (locale === "en") {
    return englishMessages;
  }

  const localeMessages =
    await loadOptionalMessages(locale, file);

  return deepMergeMessages(
    englishMessages,
    localeMessages
  );
}

export default getRequestConfig(
  async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale =
      requested && isLocale(requested)
        ? requested
        : defaultLocale;

    const [
      common,
      products,
      footer,
      about,
      markets,
      quality,
      contact,
      home,
    ] = await Promise.all([
      loadNamespace(locale, "common"),
      loadNamespace(locale, "products"),
      loadNamespace(locale, "footer"),
      loadNamespace(locale, "about"),
      loadNamespace(locale, "markets"),
      loadNamespace(locale, "quality"),
      loadNamespace(locale, "contact"),
      loadNamespace(locale, "home"),
    ]);

    return {
      locale,
      messages: {
        ...common,
        ...products,
        ...footer,
        ...about,
        ...markets,
        ...quality,
        ...contact,
        ...home,
      },
    };
  }
);