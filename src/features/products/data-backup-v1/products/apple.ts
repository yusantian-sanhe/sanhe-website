import type { Product } from "../../types";

export const apple: Product = {
  slug: "apple",
  categorySlug: "fresh-fruits",

  category: "Fresh Fruits",
  name: "Apple",
  description:
    "Fresh apples selected for global fruit importers and distributors.",
  details:
    "We support apple export with product selection, cold chain handling, packing and shipment coordination.",

  image: "/products/apple/main.png",
  images: ["/products/apple/main.png"],

  specifications: [
    "Multiple varieties available",
    "Size grading available",
    "Fresh and firm fruit",
    "Export carton packing",
  ],

  packaging: "Carton or customized packing",
  moq: "One container",
  supplyAbility: "Seasonal stable supply",
  loadingCapacity: "According to packing and container type",
};