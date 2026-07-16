const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const locales = ["en", "zh", "ru", "ar", "es", "fr"];
const productDir = path.join(
  root, "src", "features", "products", "data", "products"
);

const slugs = fs
  .readdirSync(productDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => file.replace(/\.ts$/, ""));

let failed = false;

for (const locale of locales) {
  const filePath = path.join(
    root, "src", "messages", locale, "products.json"
  );
  const data = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const items = data?.products?.items ?? {};
  const related =
    data?.products?.detailSections
      ?.relatedProducts?.items ?? {};

  const missing = slugs.filter(
    (slug) => !items[slug] || !related[slug]
  );

  if (missing.length) {
    failed = true;
    console.error(
      `${locale}: missing ${missing.join(", ")}`
    );
  } else {
    console.log(`${locale}: 26/26 complete`);
  }
}

if (failed) process.exit(1);

console.log(
  "\nAll locale product records are complete."
);
