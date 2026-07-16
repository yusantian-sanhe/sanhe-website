import type { Product } from "../../types";

export const freshOnion: Product = {
  slug: "fresh-onion",
  categorySlug: "fresh-vegetables",

  category: "Fresh Vegetables",
  name: "Fresh Onion",
  description:
    "Fresh onions prepared for wholesale, retail and food service markets.",
  details:
    "Our fresh onion supply supports importers with product selection, packing control and export documentation.",

  image: "/products/fresh-onion/main.png",
  images: ["/products/fresh-onion/main.png"],

  specifications: [
    "Red onion and yellow onion options",
    "Different sizes available",
    "Firm and clean bulbs",
    "Export-ready packing",
  ],

  packaging: "Mesh bag, carton or customized packing",
  moq: "One container",
  supplyAbility: "Seasonal stable supply",
  loadingCapacity: "According to packing and container type",
};