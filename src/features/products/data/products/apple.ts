import type { Product } from "../../types";

export const apple: Product = {
  slug: "apple",
  categorySlug: "fresh-fruits",

  category: "Fresh Fruits",
  name: "Apple",

  description:
    "Fresh apples selected for global fruit importers, supermarkets and distributors.",

  details:
    "SanHe supports apple export with variety selection, size grading, cold-chain handling, packing and shipment coordination.",

  image: "/images/products/apple/main.jpg",
  images: [
    "/images/products/apple/main.jpg",
  ],

  specifications: [
    "Multiple varieties available",
    "Size grading available",
    "Fresh and firm fruit",
    "Export carton packing",
  ],

  packaging:
    "Carton or customized export packaging",

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
      "Red Apple",
      "Green Apple",
    ],
    season:
      "Seasonal production with cold-storage support",
    storage:
      "Cold storage",
    sizes: [
      "Multiple count sizes available",
    ],
    processingOptions: [
      "Sorting",
      "Grading",
      "Protective Packing",
    ],
  },
};
