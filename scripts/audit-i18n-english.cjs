const fs = require("fs");
const path = require("path");

const locales = ["ru", "ar", "es", "fr"];
const files = [
  "common",
  "home",
  "products",
  "footer",
  "about",
  "markets",
  "quality",
  "contact"
];

function flatten(value, prefix = "", result = {}) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      flatten(item, `${prefix}[${index}]`, result);
    });
    return result;
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    for (const [key, item] of Object.entries(value)) {
      const next = prefix ? `${prefix}.${key}` : key;
      flatten(item, next, result);
    }
    return result;
  }

  result[prefix] = value;
  return result;
}

const allowedSameValues = new Set([
  "SanHe",
  "OEM",
  "WhatsApp",
  "LinkedIn",
  "SGS",
  "HACCP",
  "BRC"
]);

for (const file of files) {
  const enPath = path.join(
    "src",
    "messages",
    "en",
    `${file}.json`
  );

  if (!fs.existsSync(enPath)) {
    continue;
  }

  let en;

  try {
    en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  } catch {
    continue;
  }

  const enFlat = flatten(en);

  console.log(`\n========== ${file}.json ==========`);

  for (const locale of locales) {
    const localePath = path.join(
      "src",
      "messages",
      locale,
      `${file}.json`
    );

    if (!fs.existsSync(localePath)) {
      continue;
    }

    let localized;

    try {
      localized = JSON.parse(
        fs.readFileSync(localePath, "utf8")
      );
    } catch {
      continue;
    }

    const localizedFlat = flatten(localized);

    const unchanged = Object.entries(enFlat).filter(
      ([key, enValue]) => {
        const localizedValue = localizedFlat[key];

        return (
          typeof enValue === "string" &&
          typeof localizedValue === "string" &&
          enValue === localizedValue &&
          !allowedSameValues.has(enValue)
        );
      }
    );

    console.log(
      `\n${locale}: ${unchanged.length} unchanged English value(s)`
    );

    for (const [key, value] of unchanged) {
      console.log(`  - ${key}: ${value}`);
    }
  }
}
