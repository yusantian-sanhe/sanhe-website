const fs = require("fs");
const path = require("path");

const translations = {
  ar: {
    home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    products: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
    markets: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642",
    quality: "\u0627\u0644\u062c\u0648\u062f\u0629",
    about: "\u0645\u0646 \u0646\u062d\u0646",
    contact: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
    quote: "\u0637\u0644\u0628 \u0639\u0631\u0636 \u0633\u0639\u0631"
  },

  es: {
    home: "Inicio",
    products: "Productos",
    markets: "Mercados",
    quality: "Calidad",
    about: "Nosotros",
    contact: "Contacto",
    quote: "Solicitar cotizaci\u00f3n"
  },

  fr: {
    home: "Accueil",
    products: "Produits",
    markets: "March\u00e9s",
    quality: "Qualit\u00e9",
    about: "\u00c0 propos",
    contact: "Contact",
    quote: "Demander un devis"
  }
};

function repairKnownStructure(raw, locale) {
  const before = raw;

  /*
   * Repairs this invalid structure:
   *
   * "learnMore": "Learn More"
   * },
   * "supplyChain": {
   *
   * into:
   *
   * "learnMore": "Learn More",
   * "supplyChain": {
   */
  raw = raw.replace(
    /("learnMore"\s*:\s*"[^"]*")\s*\}\s*,\s*("supplyChain"\s*:)/,
    "$1,\n  $2"
  );

  if (raw !== before) {
    console.log(`Repaired known structure: ${locale}/common.json`);
  }

  return raw;
}

for (const [locale, navigation] of Object.entries(translations)) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "messages",
    locale,
    "common.json"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const backupPath = `${filePath}.before-navigation-fix`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`Backup created: ${backupPath}`);
  }

  let raw = fs.readFileSync(filePath, "utf8");
  raw = repairKnownStructure(raw, locale);

  let messages;

  try {
    messages = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `${locale}/common.json is still invalid after automatic repair:\n` +
      `${error.message}\n\n` +
      `Backup: ${backupPath}`
    );
  }

  messages.navigation = navigation;

  fs.writeFileSync(
    filePath,
    JSON.stringify(messages, null, 2) + "\n",
    "utf8"
  );

  console.log(`Updated: ${locale}/common.json`);
}

console.log("\nNavigation verification:");

for (const locale of Object.keys(translations)) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "messages",
    locale,
    "common.json"
  );

  const messages = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  console.log(`\n${locale}:`);
  console.log(messages.navigation);
}

console.log("\nAll three common.json files are valid.");
