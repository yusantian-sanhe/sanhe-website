const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const locales = ["ru", "ar", "es", "fr"];
const allLocales = ["en", ...locales];
const data = {};

for (const locale of allLocales) {
  const file = path.join(
    root,
    "src",
    "messages",
    locale,
    "products.json"
  );

  if (!fs.existsSync(file)) {
    throw new Error(`Missing file: ${file}`);
  }

  data[locale] = JSON.parse(
    fs.readFileSync(file, "utf8")
  );
}

const fields = [
  "name",
  "description",
  "details",
  "specifications",
  "packaging",
  "moq",
  "supplyAbility",
  "loadingCapacity",
];

const normalize = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

function compare({
  locale,
  slug,
  field,
  localized,
  english,
  issues,
}) {
  if (Array.isArray(english)) {
    const localizedArray = Array.isArray(localized)
      ? localized
      : [];

    english.forEach((item, index) => {
      if (
        normalize(localizedArray[index]) ===
        normalize(item)
      ) {
        issues.push({
          locale,
          slug,
          field: `${field}.${index}`,
          value: localizedArray[index],
        });
      }
    });

    return;
  }

  if (normalize(localized) === normalize(english)) {
    issues.push({
      locale,
      slug,
      field,
      value: localized,
    });
  }
}

const englishItems =
  data.en?.products?.items ?? {};

const report = {
  generatedAt: new Date().toISOString(),
  summary: {},
  issues: [],
};

for (const locale of locales) {
  const localizedItems =
    data[locale]?.products?.items ?? {};
  const issues = [];

  for (const [slug, englishProduct] of Object.entries(
    englishItems
  )) {
    const localizedProduct =
      localizedItems[slug] ?? {};

    for (const field of fields) {
      compare({
        locale,
        slug,
        field,
        localized: localizedProduct[field],
        english: englishProduct[field],
        issues,
      });
    }

    const englishRelated =
      data.en?.products?.detailSections
        ?.relatedProducts?.items?.[slug] ?? {};

    const localizedRelated =
      data[locale]?.products?.detailSections
        ?.relatedProducts?.items?.[slug] ?? {};

    for (const field of ["name", "description"]) {
      compare({
        locale,
        slug,
        field: `relatedProducts.${field}`,
        localized: localizedRelated[field],
        english: englishRelated[field],
        issues,
      });
    }
  }

  report.summary[locale] = {
    issueCount: issues.length,
    affectedProducts: [
      ...new Set(issues.map((item) => item.slug)),
    ].length,
  };

  report.issues.push(...issues);
}

const reportsDir = path.join(root, "reports");
fs.mkdirSync(reportsDir, { recursive: true });

fs.writeFileSync(
  path.join(
    reportsDir,
    "product-localization-audit.json"
  ),
  JSON.stringify(report, null, 2) + "\n",
  "utf8"
);

const lines = [
  "# SanHe Product Localization Audit",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  "| Locale | Issues | Affected Products |",
  "|---|---:|---:|",
];

for (const locale of locales) {
  const item = report.summary[locale];

  lines.push(
    `| ${locale} | ${item.issueCount} | ${item.affectedProducts} |`
  );
}

lines.push("", "## Issues", "");

for (const locale of locales) {
  lines.push(`### ${locale}`, "");

  const items = report.issues.filter(
    (item) => item.locale === locale
  );

  if (items.length === 0) {
    lines.push("No identical English fallback found.", "");
    continue;
  }

  for (const item of items) {
    lines.push(
      `- \`${item.slug}\` → \`${item.field}\`: ${normalize(item.value)}`
    );
  }

  lines.push("");
}

fs.writeFileSync(
  path.join(
    reportsDir,
    "product-localization-audit.md"
  ),
  lines.join("\n") + "\n",
  "utf8"
);

for (const locale of locales) {
  const item = report.summary[locale];

  console.log(
    `${locale}: ${item.issueCount} issues across ${item.affectedProducts} products`
  );
}

console.log("\nReports created in reports/");

if (report.issues.length > 0) {
  process.exitCode = 2;
}
