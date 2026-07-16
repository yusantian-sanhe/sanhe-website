export {
  productCategories,
  products,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "./data";

export {
  getActiveProducts,
  getActiveProductsByCategory,
  getRelatedProducts,
  isProductActive,
} from "./selectors";

export {
  PRODUCT_IMAGE_FILE,
  PRODUCT_IMAGE_ROOT,
  createProductImagePath,
} from "./media";

export type {
  Product,
  ProductAdditionalDetails,
  ProductAdvantage,
  ProductCategory,
  ProductSeo,
} from "./types";
