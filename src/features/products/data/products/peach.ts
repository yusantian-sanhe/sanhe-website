import type { Product } from "../../types";

export const peach: Product = {
  slug: "peach",
  categorySlug: "fresh-fruits",

  category: "Fresh Fruits",
  name: "Peach",

  description:
    "Fresh peaches selected for seasonal export programs and international fruit buyers.",

  details:
    "SanHe coordinates peach selection, grading, protective packing, cold-chain handling and shipment planning.",

  image: "/images/products/peach/main.jpg",
  images: [
    "/images/products/peach/main.jpg",
  ],

  specifications: [
    "Seasonal varieties available",
    "Size grading available",
    "Protective export packing",
    "Cold-chain support",
  ],

  packaging:
    "Protective carton or customized export packaging",

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
      "Yellow Peach",
      "White Peach",
    ],
    season:
      "Seasonal supply",
    storage:
      "Cold storage and rapid shipment",
    sizes: [
      "Multiple grades available",
    ],
    processingOptions: [
      "Sorting",
      "Grading",
      "Protective Packing",
    ],
  },
};
