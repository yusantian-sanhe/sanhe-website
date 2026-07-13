import type { Product } from "../../types";

export const freshGinger: Product = {
  slug: "fresh-ginger",
  categorySlug: "fresh-vegetables",

  category: "Fresh Vegetables",
  name: "Fresh Ginger",
  description:
    "Fresh ginger supplied from China with stable quality, export packing and cold chain support.",
  details:
    "Fresh ginger is one of our key export products. We support global buyers with stable sourcing, sorting, cleaning, packing and export coordination.",

  image: "/products/fresh-ginger/main.png",
  images: ["/products/fresh-ginger/main.png"],

  specifications: [
    "Fresh, clean and firm",
    "Washed or air-dried options",
    "Different sizes available",
    "Export packing available",
  ],

  packaging: "10kg / 13.6kg carton or customized packing",

  packagingOptions: [
    "10kg Carton",
    "13.6kg Carton",
    "Mesh Bag",
    "Customized Packaging",
    "Private Label",
  ],

  moq: "One container",
  supplyAbility: "Stable seasonal supply",
  loadingCapacity: "According to packing and container type",

  advantages: [
    {
      title: "Fresh from Source",
      description:
        "Selected from self-owned planting bases for reliable quality.",
    },
    {
      title: "Stable Year-round Supply",
      description:
        "Reliable production and export throughout the year.",
    },
    {
      title: "Factory Direct Processing",
      description:
        "Cleaning, grading and processing managed in-house.",
    },
    {
      title: "Cold Chain Warehousing",
      description:
        "Maintaining freshness before export shipment.",
    },
    {
      title: "Customized Packaging",
      description:
        "OEM, private label and customized packaging available.",
    },
    {
      title: "Global Export Experience",
      description:
        "Serving importers, wholesalers and supermarkets worldwide.",
    },
  ],

  supplyCapabilities: [
    "Own Planting Bases",
    "Factory Direct Processing",
    "Cold Chain Warehousing",
    "Full Product Traceability",
    "OEM & Private Label",
    "Mixed Container Service",
  ],

  applications: [
    "Importers",
    "Wholesalers",
    "Supermarkets",
    "Food Manufacturers",
    "Food Service Companies",
    "Distributors",
  ],
};