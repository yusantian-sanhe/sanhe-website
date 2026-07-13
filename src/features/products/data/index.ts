import { productCategories } from "./categories";
import { products } from "./products";

export { productCategories, products };

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter(
    (product) => product.categorySlug === categorySlug
  );
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find(
    (category) => category.slug === slug
  );
}