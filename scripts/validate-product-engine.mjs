import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const productFilesDirectory = path.join(
  projectRoot,
  "src",
  "features",
  "products",
  "data",
  "products"
);

const imageRoot = path.join(
  projectRoot,
  "public",
  "images",
  "products"
);

const errors = [];
const warnings = [];

if (!fs.existsSync(productFilesDirectory)) {
  errors.push(
    "Missing product data directory: " +
      productFilesDirectory
  );
} else {
  const files = fs
    .readdirSync(productFilesDirectory)
    .filter((file) => file.endsWith(".ts"));

  for (const file of files) {
    const slug = file.replace(/\.ts$/, "");
    const expectedImage = path.join(
      imageRoot,
      slug,
      "main.jpg"
    );

    if (!fs.existsSync(expectedImage)) {
      warnings.push(
        `Missing image: public/images/products/${slug}/main.jpg`
      );
    }
  }

  console.log(
    `Product modules found: ${files.length}`
  );
}

if (errors.length > 0) {
  console.error("\nProduct Engine validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("\nProduct Engine warnings:");

  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

console.log(
  "\nProduct Engine structure validation completed."
);
