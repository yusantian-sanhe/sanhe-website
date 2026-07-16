import type { Product } from "../../types";

export const freshCarrot: Product = {
  slug: "fresh-carrot",
  categorySlug: "fresh-vegetables",

  category: "Fresh Vegetables",
  name: "Fresh Carrot",

  description:
    "Fresh carrots selected for international wholesale, retail and food-processing markets.",

  details:
    "SanHe coordinates sourcing, washing, grading, packing and cold-chain handling for export-ready fresh carrots.",

  image: "/images/products/fresh-carrot/main.jpg",
  images: [
    "/images/products/fresh-carrot/main.jpg",
  ],

  specifications: [
    "Fresh and firm roots",
    "Washed and graded options",
    "Multiple sizes available",
    "Export-ready packing",
  ],

  packaging:
    "Carton, bag or customized export packaging",

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
      "Washed Carrot",
      "Unwashed Carrot",
    ],
    season:
      "Seasonal production with storage-supported supply",
    storage:
      "Cold storage according to product condition",
    sizes: [
      "Multiple grades available",
    ],
    processingOptions: [
      "Washing",
      "Sorting",
      "Grading",
      "Customized Packing",
    ],
  },
};
