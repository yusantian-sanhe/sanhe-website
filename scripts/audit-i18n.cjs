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

for (const file of files) {
  const enPath = path.join(
    "src",
    "messages",
    "en",
    `${file}.json`
  );

  if (!fs.existsSync(enPath)) {
    console.log(`\n[SKIP] Missing English file: ${file}.json`);
    continue;
  }

  let en;

  try {
    en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  } catch (error) {
    console.log(`\n[ERROR] Invalid English JSON: ${enPath}`);
    console.log(error.message);
    continue;
  }

  const enKeys = Object.keys(flatten(en));

  console.log(`\n========== ${file}.json ==========`);

  for (const locale of locales) {
    const localePath = path.join(
      "src",
      "messages",
      locale,
      `${file}.json`
    );

    if (!fs.existsSync(localePath)) {
      console.log(
        `\n${locale}: FILE MISSING (${localePath})`
      );
      continue;
    }

    let localized;

    try {
      localized = JSON.parse(
        fs.readFileSync(localePath, "utf8")
      );
    } catch (error) {
      console.log(`\n${locale}: INVALID JSON`);
      console.log(error.message);
      continue;
    }

    const localizedFlat = flatten(localized);
    const missing = enKeys.filter(
      (key) => !(key in localizedFlat)
    );

    console.log(
      `\n${locale}: ${missing.length} missing key(s)`
    );

    for (const key of missing) {
      console.log(`  - ${key}`);
    }
  }
}
