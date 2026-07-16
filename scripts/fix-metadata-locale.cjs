const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetFiles = [
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/about/page.tsx",
  "src/app/[locale]/markets/page.tsx",
  "src/app/[locale]/quality/page.tsx",
  "src/app/[locale]/contact/page.tsx",
  "src/app/[locale]/contact/success/page.tsx",
  "src/app/[locale]/products/page.tsx",
  "src/app/[locale]/products/[category]/page.tsx",
  "src/app/[locale]/products/[category]/[product]/page.tsx"
];

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}

function addLocaleToMetadataCalls(source, relativePath) {
  const marker = "generatePageMetadata({";
  let cursor = 0;
  let updated = source;
  let changeCount = 0;

  while (true) {
    const markerIndex = updated.indexOf(marker, cursor);

    if (markerIndex === -1) {
      break;
    }

    const openBraceIndex = markerIndex + marker.length - 1;
    const closeBraceIndex = findMatchingBrace(updated, openBraceIndex);

    if (closeBraceIndex === -1) {
      throw new Error(
        `Could not find closing brace for generatePageMetadata in ${relativePath}`
      );
    }

    const objectBody = updated.slice(
      openBraceIndex + 1,
      closeBraceIndex
    );

    const alreadyHasLocale =
      /(^|[\n,])\s*locale\s*[:,]/m.test(objectBody);

    if (!alreadyHasLocale) {
      const indentationMatch =
        objectBody.match(/\n([ \t]+)[A-Za-z_$]/);

      const indentation = indentationMatch
        ? indentationMatch[1]
        : "    ";

      const insertion = `\n${indentation}locale,`;

      updated =
        updated.slice(0, closeBraceIndex) +
        insertion +
        updated.slice(closeBraceIndex);

      changeCount += 1;
      cursor = closeBraceIndex + insertion.length + 1;
    } else {
      cursor = closeBraceIndex + 1;
    }
  }

  return {
    source: updated,
    changeCount
  };
}

let totalChanges = 0;

for (const relativePath of targetFiles) {
  const filePath = path.join(root, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`Skipped missing file: ${relativePath}`);
    continue;
  }

  const original = fs.readFileSync(filePath, "utf8");
  const result = addLocaleToMetadataCalls(
    original,
    relativePath
  );

  if (result.changeCount === 0) {
    console.log(`No change needed: ${relativePath}`);
    continue;
  }

  const backupPath =
    `${filePath}.before-metadata-locale-fix`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`Backup created: ${backupPath}`);
  }

  fs.writeFileSync(
    filePath,
    result.source,
    "utf8"
  );

  totalChanges += result.changeCount;

  console.log(
    `Updated ${relativePath}: ` +
    `${result.changeCount} metadata call(s)`
  );
}

const seoPath = path.join(
  root,
  "src",
  "constants",
  "seo.ts"
);

if (fs.existsSync(seoPath)) {
  const originalSeo = fs.readFileSync(
    seoPath,
    "utf8"
  );

  if (!/\bar\s*:\s*"ar_AR"/.test(originalSeo)) {
    const localeMapPattern =
      /(localeMap\s*:\s*\{[\s\S]*?\bru\s*:\s*"ru_RU",)/;

    if (!localeMapPattern.test(originalSeo)) {
      throw new Error(
        "Could not find localeMap ru entry in src/constants/seo.ts"
      );
    }

    const updatedSeo = originalSeo.replace(
      localeMapPattern,
      `$1\n    ar: "ar_AR",`
    );

    const backupPath =
      `${seoPath}.before-metadata-locale-fix`;

    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(seoPath, backupPath);
      console.log(`Backup created: ${backupPath}`);
    }

    fs.writeFileSync(
      seoPath,
      updatedSeo,
      "utf8"
    );

    totalChanges += 1;
    console.log(
      "Updated src/constants/seo.ts: added ar_AR"
    );
  } else {
    console.log(
      "No change needed: src/constants/seo.ts"
    );
  }
}

console.log(
  `\nMetadata locale fix completed. ` +
  `${totalChanges} change(s) applied.`
);