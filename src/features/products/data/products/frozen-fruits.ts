import type { Product } from "../../types";

export const frozenFruits: Product = {
  slug: "frozen-fruits",
  categorySlug: "frozen-foods",

  category: "Frozen Foods",
  name: "Frozen Fruits",

  description:
    "Frozen fruits supplied for food processing, bakery, beverage and food-service buyers.",

  details:
    "SanHe coordinates fruit selection, rapid freezing, packing and export cold-chain service.",

  image: "/images/products/frozen-fruits/main.jpg",
  images: [
    "/images/products/frozen-fruits/main.jpg",
  ],

  specifications: [
    "Multiple fruit options",
    "Whole, sliced or diced formats",
    "Rapid freezing",
    "Customized packing",
  ],

  packaging:
    "Bag, carton or customized export packaging",

  packagingOptions: [
    "10kg Carton",
    "13.6kg Carton",
    "Mesh Bag",
    "Customized Packaging",
    "Private Label",
  ],

  moq:
    "Negotiable according to product and packing specification",

  supplyAbility:
    "Stable supply supported by coordinated production, processing and storage",

  loadingCapacity:
    "According to packaging specification and container type",

  advantages: [
    {
      title: "Fresh from Source",
      description:
        "Selected through carefully managed planting and sourcing channels.",
    },
    {
      title: "Stable Year-round Supply",
      description:
        "Coordinated production, storage and sourcing support continuous supply.",
    },
    {
      title: "Factory Direct Processing",
      description:
        "Processing and packing are coordinated under controlled standards.",
    },
    {
      title: "Cold Chain Warehousing",
      description:
        "Storage and cold-chain coordination support product quality.",
    },
    {
      title: "Customized Packaging",
      description:
        "OEM, private-label and market-specific packaging are available.",
    },
    {
      title: "Global Export Experience",
      description:
        "Professional export coordination for international buyers.",
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

  additionalDetails: {
    origin: "China",
    varieties: [
      "Strawberry",
      "Blueberry",
      "Mixed Fruits",
    ],
    season:
      "Year-round frozen supply",
    storage:
      "Frozen storage at required temperature",
    sizes: [
      "Customized formats and pack sizes",
    ],
    processingOptions: [
      "Selection",
      "Cutting",
      "Rapid Freezing",
      "Customized Packing",
    ],
  },
};
