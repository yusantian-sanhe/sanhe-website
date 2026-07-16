import type { Product } from "../../types";

export const pear: Product = {
  slug: "pear",
  categorySlug: "fresh-fruits",

  category: "Fresh Fruits",
  name: "Pear",
  description:
    "Fresh pears supplied for supermarkets, importers and wholesale markets.",
  details:
    "Fresh pears are available with export-grade sorting, packing and cold chain support.",

  image: "/products/pear/main.png",
  images: ["/products/pear/main.png"],

  specifications: [
    "Fresh and crisp",
    "Different sizes available",
    "Export-grade selection",
    "Cold chain handling available",
  ],

  packaging: "Carton or customized packing",
  moq: "One container",
  supplyAbility: "Seasonal stable supply",
  loadingCapacity: "According to packing and container type",
};