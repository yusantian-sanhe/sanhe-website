export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
}

export interface Product {
  slug: string;
  categorySlug: string;
  category: string;
  name: string;
  description: string;
  details: string;
  image: string;
  images: string[];
  specifications: string[];
  packaging: string;
  packagingOptions?: string[];
  moq: string;
  supplyAbility: string;
  loadingCapacity: string;

  advantages?: {
    title: string;
    description: string;
  }[];

  supplyCapabilities?: string[];
  applications?: string[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "fresh-vegetables",
    name: "Fresh Vegetables",
    description:
      "Fresh ginger, garlic, onion, potato, carrot, taro, yam, bell pepper and other fresh vegetables.",
  },
  {
    slug: "fresh-fruits",
    name: "Fresh Fruits",
    description:
      "Apples, pears, peaches, grapes, blueberries and other seasonal fresh fruits.",
  },
  {
    slug: "frozen-foods",
    name: "Frozen Foods",
    description:
      "Frozen ginger products, garlic products, onion, vegetables, fruits and food ingredients.",
  },
  {
    slug: "prepared-foods",
    name: "Prepared Foods",
    description:
      "Ready-to-cook products, prepared vegetable products and customized prepared foods.",
  },
];

export const products: Product[] = [
  {
    slug: "fresh-ginger",
    categorySlug: "fresh-vegetables",
    category: "Fresh Vegetables",
    name: "Fresh Ginger",
    description:
      "Fresh ginger supplied from China with stable quality, export packing and cold chain support.",
    details:
      "Fresh ginger is one of our key export products. We support global buyers with stable sourcing, sorting, cleaning, packing and export coordination.",
    image: "/images/products/ginger/main.jpeg",
    images: ["/images/products/ginger/main.jpeg"],
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
},
  {
    slug: "fresh-garlic",
    categorySlug: "fresh-vegetables",
    category: "Fresh Vegetables",
    name: "Fresh Garlic",
    description:
      "Fresh garlic for international importers, wholesalers and food distributors.",
    details:
      "We provide fresh garlic with export-grade packing, size selection and shipment coordination for global markets.",
    image: "/images/products/garlic/main.jpeg",
    images: ["/images/products/garlic/main.jpeg"],
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
  },
  {
    slug: "fresh-onion",
    categorySlug: "fresh-vegetables",
    category: "Fresh Vegetables",
    name: "Fresh Onion",
    description:
      "Fresh onions prepared for wholesale, retail and food service markets.",
    details:
      "Our fresh onion supply supports importers with product selection, packing control and export documentation.",
    image: "/images/products/onion/main.jpeg",
    images: ["/images/products/onion/main.jpeg"],
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
  },
  {
    slug: "fresh-potato",
    categorySlug: "fresh-vegetables",
    category: "Fresh Vegetables",
    name: "Fresh Potato",
    description:
      "Fresh potatoes supplied with sorting, packing and export service.",
    details:
      "Fresh potatoes are available for importers, wholesalers and food service companies with flexible packing requirements.",
    image: "/images/products/potato/main.jpeg",
    images: ["/images/products/potato/main.jpeg"],
    specifications: [
      "Clean appearance",
      "Different sizes available",
      "Suitable for wholesale and retail",
      "Export packing available",
    ],
    packaging: "Mesh bag, carton or customized packing",
    moq: "One container",
    supplyAbility: "Stable seasonal supply",
    loadingCapacity: "According to packing and container type",
  },
  {
    slug: "apple",
    categorySlug: "fresh-fruits",
    category: "Fresh Fruits",
    name: "Apple",
    description:
      "Fresh apples selected for global fruit importers and distributors.",
    details:
      "We support apple export with product selection, cold chain handling, packing and shipment coordination.",
    image: "/images/products/apple/main.jpeg",
    images: ["/images/products/apple/main.jpeg"],
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
  },
  {
    slug: "pear",
    categorySlug: "fresh-fruits",
    category: "Fresh Fruits",
    name: "Pear",
    description:
      "Fresh pears supplied for supermarkets, importers and wholesale markets.",
    details:
      "Fresh pears are available with export-grade sorting, packing and cold chain support.",
    image: "/images/products/pear/main.jpeg",
    images: ["/images/products/pear/main.jpeg"],
    specifications: [
      "Fresh and crisp",
      "Different sizes available",
      "Export-grade selection",
      "Cold chain handling available",
    ],
    packaging: "Carton or customized packing",
    moq: "One container",
    supplyAbility: "Seasonal stable supply",
    loadingCapacity: "According to packing and container type",
  },
  {
    slug: "frozen-ginger-products",
    categorySlug: "frozen-foods",
    category: "Frozen Foods",
    name: "Frozen Ginger Products",
    description:
      "Frozen ginger products for food manufacturers, distributors and food service buyers.",
    details:
      "We provide frozen ginger products with cold chain storage, customized processing and export service.",
    image: "/images/products/frozen-ginger/main.jpeg",
    images: ["/images/products/frozen-ginger/main.jpeg"],
    specifications: [
      "Frozen ginger slices, dices or paste options",
      "Customized processing available",
      "Cold chain storage",
      "Export documentation support",
    ],
    packaging: "Carton, bag or customized packing",
    moq: "Negotiable by product type",
    supplyAbility: "Stable frozen storage supply",
    loadingCapacity: "According to packing and container type",
  },
  {
    slug: "frozen-vegetables",
    categorySlug: "frozen-foods",
    category: "Frozen Foods",
    name: "Frozen Vegetables",
    description:
      "Frozen vegetables prepared for food manufacturers, supermarkets and distributors.",
    details:
      "Frozen vegetables can be supplied with customized specifications, packing and cold chain logistics.",
    image: "/images/products/frozen-vegetables/main.jpeg",
    images: ["/images/products/frozen-vegetables/main.jpeg"],
    specifications: [
      "Multiple vegetable options",
      "Customized cuts available",
      "Cold chain handling",
      "Suitable for food processing",
    ],
    packaging: "Carton, bag or customized packing",
    moq: "Negotiable by product type",
    supplyAbility: "Stable frozen supply",
    loadingCapacity: "According to packing and container type",
  },
  {
    slug: "prepared-vegetable-products",
    categorySlug: "prepared-foods",
    category: "Prepared Foods",
    name: "Prepared Vegetable Products",
    description:
      "Prepared vegetable products and customized ready-to-cook solutions.",
    details:
      "We support customized prepared food production according to buyer requirements, processing standards and packing needs.",
    image: "/images/products/prepared-vegetables/main.jpeg",
    images: ["/images/products/prepared-vegetables/main.jpeg"],
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
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}