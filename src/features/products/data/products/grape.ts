import type { Product } from "../../types";

export const grape: Product = {
  slug: "grape",
  categorySlug: "fresh-fruits",

  category: "Fresh Fruits",
  name: "Grape",

  description:
    "Fresh grapes prepared for international wholesale, retail and food-service markets.",

  details:
    "SanHe supports grape export with variety selection, careful handling, cold-chain coordination and customized packing.",

  image: "/images/products/grape/main.jpg",
  images: [
    "/images/products/grape/main.jpg",
  ],

  specifications: [
    "Green, red and dark grape options",
    "Fresh and firm berries",
    "Cold-chain handling",
    "Retail and wholesale packing",
  ],

  packaging:
    "Carton, punnet or customized export packaging",

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
      "Green Grape",
      "Red Grape",
      "Dark Grape",
    ],
    season:
      "Seasonal supply",
    storage:
      "Cold storage",
    sizes: [
      "Multiple bunch and berry grades",
    ],
    processingOptions: [
      "Selection",
      "Grading",
      "Punnet Packing",
    ],
  },
};
