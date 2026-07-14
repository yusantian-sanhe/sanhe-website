const fs = require("fs");
const path = require("path");

const root = process.cwd();
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

const allowedSame = new Set([
  "SanHe",
  "OEM",
  "B2B",
  "WhatsApp",
  "LinkedIn",
  "SGS",
  "HACCP",
  "BRC",
  "10+",
  "30+",
  "1,000+",
  "200+",
  "5",
  "100%",
  "name@company.com"
]);

function flatten(value, prefix = "", result = {}) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      flatten(item, `${prefix}[${index}]`, result);
    });
    return result;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const next = prefix ? `${prefix}.${key}` : key;
      flatten(item, next, result);
    }
    return result;
  }

  result[prefix] = value;
  return result;
}

let hasErrors = false;

for (const file of files) {
  const enPath = path.join(root, "src", "messages", "en", `${file}.json`);

  if (!fs.existsSync(enPath)) {
    console.log(`\n[SKIP] Missing English source: ${file}.json`);
    continue;
  }

  let en;

  try {
    en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  } catch (error) {
    hasErrors = true;
    console.log(`\n[ERROR] Invalid English JSON: ${enPath}`);
    console.log(error.message);
    continue;
  }

  const enFlat = flatten(en);
  console.log(`\n========== ${file}.json ==========`);

  for (const locale of locales) {
    const localePath = path.join(
      root,
      "src",
      "messages",
      locale,
      `${file}.json`
    );

    if (!fs.existsSync(localePath)) {
      hasErrors = true;
      console.log(`${locale}: FILE MISSING`);
      continue;
    }

    let localized;

    try {
      localized = JSON.parse(fs.readFileSync(localePath, "utf8"));
    } catch (error) {
      hasErrors = true;
      console.log(`${locale}: INVALID JSON`);
      console.log(error.message);
      continue;
    }

    const localizedFlat = flatten(localized);
    const missing = Object.keys(enFlat).filter(
      (key) => !(key in localizedFlat)
    );

    const unchanged = Object.entries(enFlat).filter(
      ([key, enValue]) => {
        const localizedValue = localizedFlat[key];
        return (
          typeof enValue === "string" &&
          typeof localizedValue === "string" &&
          enValue === localizedValue &&
          !allowedSame.has(enValue)
        );
      }
    );

    if (missing.length || unchanged.length) {
      hasErrors = true;
    }

    console.log(
      `${locale}: ${missing.length} missing, ${unchanged.length} unchanged English`
    );

    for (const key of missing) {
      console.log(`  MISSING: ${key}`);
    }

    for (const [key, value] of unchanged) {
      console.log(`  ENGLISH: ${key}: ${value}`);
    }
  }
}

console.log(
  hasErrors
    ? "\nAudit finished with findings."
    : "\nAudit passed: no missing keys or unexpected English values."
);