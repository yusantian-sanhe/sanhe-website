const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const locales = ["en", "zh", "ru", "ar", "es", "fr"];
const productDir = path.join(
  root, "src", "features", "products", "data", "products"
);

function readString(source, key) {
  const pattern = new RegExp(
    String.raw`${key}:\s*(?:\n\s*)?"([\s\S]*?)"\s*,`
  );
  return source.match(pattern)?.[1] ?? "";
}

function readArray(source, key) {
  const pattern = new RegExp(
    String.raw`${key}:\s*\[([\s\S]*?)\]\s*,`
  );
  const block = source.match(pattern)?.[1] ?? "";
  return [...block.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

const catalog = fs
  .readdirSync(productDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => {
    const source = fs.readFileSync(
      path.join(productDir, file),
      "utf8"
    );

    return {
      slug: readString(source, "slug"),
      name: readString(source, "name"),
      description: readString(source, "description"),
      details: readString(source, "details"),
      specifications: readArray(source, "specifications"),
      packaging: readString(source, "packaging"),
      moq: readString(source, "moq"),
      supplyAbility: readString(source, "supplyAbility"),
      loadingCapacity: readString(source, "loadingCapacity"),
    };
  });

for (const locale of locales) {
  const filePath = path.join(
    root, "src", "messages", locale, "products.json"
  );
  const backupPath =
    `${filePath}.before-product-v2-sync`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  const data = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  data.products ??= {};
  data.products.items ??= {};
  data.products.detailSections ??= {};
  data.products.detailSections.relatedProducts ??= {
    eyebrow: "Related Products",
    title: "You May Also Be Interested In",
    description:
      "Explore more products from the same category.",
    viewProduct: "View Product",
    items: {},
  };
  data.products.detailSections.relatedProducts.items ??= {};

  for (const product of catalog) {
    const existing = data.products.items[product.slug];

    data.products.items[product.slug] = {
      ...product,
      ...(existing ?? {}),
    };

    const existingRelated =
      data.products.detailSections.relatedProducts
        .items[product.slug];

    data.products.detailSections.relatedProducts
      .items[product.slug] = {
        name:
          existingRelated?.name ??
          existing?.name ??
          product.name,
        description:
          existingRelated?.description ??
          existing?.description ??
          product.description,
      };
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );

  console.log(`Synced: ${locale}/products.json`);
}

console.log(
  "\nProduct Data V2 i18n sync completed."
);
