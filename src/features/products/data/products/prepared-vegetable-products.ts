import type { Product } from "../../types";

export const preparedVegetableProducts: Product = {
  slug: "prepared-vegetable-products",
  categorySlug: "prepared-foods",

  category: "Prepared Foods",
  name: "Prepared Vegetable Products",
  description:
    "Prepared vegetable products and customized ready-to-cook solutions.",
  details:
    "We support customized prepared food production according to buyer requirements, processing standards and packing needs.",

  image: "/products/prepared-vegetable-products/main.png",
  images: ["/products/prepared-vegetable-products/main.png"],

  specifications: [
    "Customized production available",
    "Ready-to-cook options",
    "Flexible packing solutions",
    "Factory direct supply",
  ],

  packaging: "Customized packing",
  moq: "Negotiable by product specification",
  supplyAbility: "Customized production capacity",
  loadingCapacity: "According to packing and container type",
};