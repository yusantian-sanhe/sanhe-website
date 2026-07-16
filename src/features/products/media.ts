export const PRODUCT_IMAGE_ROOT =
  "/images/products";

export const PRODUCT_IMAGE_FILE =
  "main.jpg";

export function createProductImagePath(
  productSlug: string
) {
  return (
    `${PRODUCT_IMAGE_ROOT}/` +
    `${productSlug}/` +
    PRODUCT_IMAGE_FILE
  );
}
