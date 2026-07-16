export const PRODUCT_CATEGORY_SLUGS = [
  "fresh-vegetables",
  "fresh-fruits",
  "frozen-foods",
  "prepared-foods",
] as const;

export type ProductCategorySlug =
  (typeof PRODUCT_CATEGORY_SLUGS)[number];
