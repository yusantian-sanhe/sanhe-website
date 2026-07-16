import { products } from "./data";
import type { Product } from "./types";

export function isProductActive(
  product: Product
) {
  return product.status !== "draft";
}

export function getActiveProducts() {
  return products.filter(isProductActive);
}

export function getActiveProductsByCategory(
  categorySlug: string
) {
  return getActiveProducts().filter(
    (product) =>
      product.categorySlug === categorySlug
  );
}

export function getRelatedProducts(
  product: Product,
  limit = 3
) {
  return getActiveProducts()
    .filter(
      (candidate) =>
        candidate.categorySlug ===
          product.categorySlug &&
        candidate.slug !== product.slug
    )
    .slice(0, limit);
}
