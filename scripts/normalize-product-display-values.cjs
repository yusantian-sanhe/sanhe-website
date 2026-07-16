const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const productDir = path.join(
  root, "src", "features", "products", "data", "products"
);

const replacements = {
  packagingOptions: `  packagingOptions: [
    "10kg Carton",
    "13.6kg Carton",
    "Mesh Bag",
    "Customized Packaging",
    "Private Label",
  ],`,
  advantages: `  advantages: [
    {
      title: "Fresh from Source",
      description:
        "Selected through carefully managed planting and sourcing channels.",
    },
    {
      title: "Stable Year-round Supply",
      description:
        "Coordinated production, storage and sourcing support continuous supply.",
    },
    {
      title: "Factory Direct Processing",
      description:
        "Processing and packing are coordinated under controlled standards.",
    },
    {
      title: "Cold Chain Warehousing",
      description:
        "Storage and cold-chain coordination support product quality.",
    },
    {
      title: "Customized Packaging",
      description:
        "OEM, private-label and market-specific packaging are available.",
    },
    {
      title: "Global Export Experience",
      description:
        "Professional export coordination for international buyers.",
    },
  ],`,
  supplyCapabilities: `  supplyCapabilities: [
    "Own Planting Bases",
    "Factory Direct Processing",
    "Cold Chain Warehousing",
    "Full Product Traceability",
    "OEM & Private Label",
    "Mixed Container Service",
  ],`,
};

function replaceArrayBlock(source, key, replacement) {
  const startMarker = `  ${key}: [`;
  const start = source.indexOf(startMarker);

  if (start < 0) {
    console.warn(`Missing ${key}`);
    return source;
  }

  let i = start + startMarker.length;
  let depth = 1;
  let quote = "";
  let escaped = false;

  while (i < source.length && depth > 0) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
    } else if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
    } else if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
    }

    i += 1;
  }

  while (/\s/.test(source[i] ?? "")) i += 1;
  if (source[i] === ",") i += 1;

  return (
    source.slice(0, start) +
    replacement +
    source.slice(i)
  );
}

for (const file of fs
  .readdirSync(productDir)
  .filter((name) => name.endsWith(".ts"))) {
  const filePath = path.join(productDir, file);
  const backupPath =
    `${filePath}.before-display-normalize`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  let source = fs.readFileSync(filePath, "utf8");

  for (const [key, replacement] of Object.entries(
    replacements
  )) {
    source = replaceArrayBlock(
      source,
      key,
      replacement
    );
  }

  fs.writeFileSync(filePath, source, "utf8");
  console.log(`Normalized: ${file}`);
}

console.log(
  "\nProduct display values normalized."
);
