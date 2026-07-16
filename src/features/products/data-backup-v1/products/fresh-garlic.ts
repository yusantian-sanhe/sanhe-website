import type { Product } from "../../types";

export const freshGarlic: Product = {
  slug: "fresh-garlic",
  categorySlug: "fresh-vegetables",

  category: "Fresh Vegetables",
  name: "Fresh Garlic",
  description:
    "Fresh garlic for international importers, wholesalers and food distributors.",
  details:
    "We provide fresh garlic with export-grade packing, size selection and shipment coordination for global markets.",

  image: "/products/fresh-garlic/main.png",
  images: ["/products/fresh-garlic/main.png"],

  specifications: [
    "White garlic and normal white garlic options",
    "Multiple sizes available",
    "Clean appearance",
    "Suitable for export markets",
  ],

  packaging: "Mesh bag, carton or customized packing",
  moq: "One container",
  supplyAbility: "Stable supply during export season",
  loadingCapacity: "According to packing and container type",
};