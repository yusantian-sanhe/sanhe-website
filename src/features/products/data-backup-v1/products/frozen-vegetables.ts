import type { Product } from "../../types";

export const frozenVegetables: Product = {
  slug: "frozen-vegetables",
  categorySlug: "frozen-foods",

  category: "Frozen Foods",
  name: "Frozen Vegetables",
  description:
    "Frozen vegetables prepared for food manufacturers, supermarkets and distributors.",
  details:
    "Frozen vegetables can be supplied with customized specifications, packing and cold chain logistics.",

  image: "/products/frozen-vegetables/main.png",
  images: ["/products/frozen-vegetables/main.png"],

  specifications: [
    "Multiple vegetable options",
    "Customized cuts available",
    "Cold chain handling",
    "Suitable for food processing",
  ],

  packaging: "Carton, bag or customized packing",
  moq: "Negotiable by product type",
  supplyAbility: "Stable frozen supply",
  loadingCapacity: "According to packing and container type",
};