import type { Product } from "../../types";

export const freshPotato: Product = {
  slug: "fresh-potato",
  categorySlug: "fresh-vegetables",

  category: "Fresh Vegetables",
  name: "Fresh Potato",
  description:
    "Fresh potatoes supplied with sorting, packing and export service.",
  details:
    "Fresh potatoes are available for importers, wholesalers and food service companies with flexible packing requirements.",

  image: "/products/fresh-potato/main.png",
  images: ["/products/fresh-potato/main.png"],

  specifications: [
    "Clean appearance",
    "Different sizes available",
    "Suitable for wholesale and retail",
    "Export packing available",
  ],

  packaging: "Mesh bag, carton or customized packing",
  moq: "One container",
  supplyAbility: "Stable seasonal supply",
  loadingCapacity: "According to packing and container type",
};