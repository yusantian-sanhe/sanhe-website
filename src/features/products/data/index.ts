import type { Product } from "../types";
import { productCategories } from "./categories";
import { freshGinger } from "./products/fresh-ginger";
import { freshGarlic } from "./products/fresh-garlic";
import { freshOnion } from "./products/fresh-onion";
import { freshPotato } from "./products/fresh-potato";
import { freshCarrot } from "./products/fresh-carrot";
import { freshTaro } from "./products/fresh-taro";
import { apple } from "./products/apple";
import { pear } from "./products/pear";
import { peach } from "./products/peach";
import { grape } from "./products/grape";
import { blueberry } from "./products/blueberry";
import { frozenGinger } from "./products/frozen-ginger";
import { frozenGarlic } from "./products/frozen-garlic";
import { frozenOnion } from "./products/frozen-onion";
import { frozenGreenOnion } from "./products/frozen-green-onion";
import { frozenMixedVegetables } from "./products/frozen-mixed-vegetables";
import { frozenFruits } from "./products/frozen-fruits";
import { garlicPaste } from "./products/garlic-paste";
import { gingerPaste } from "./products/ginger-paste";
import { mincedGarlic } from "./products/minced-garlic";
import { mincedGinger } from "./products/minced-ginger";
import { mixedVegetables } from "./products/mixed-vegetables";
import { stirFryVegetableMix } from "./products/stir-fry-vegetable-mix";
import { soupVegetableMix } from "./products/soup-vegetable-mix";
import { dumplingFilling } from "./products/dumpling-filling";
import { seasonedVegetableMix } from "./products/seasoned-vegetable-mix";

export { productCategories };

export const products: Product[] = [
  freshGinger,
  freshGarlic,
  freshOnion,
  freshPotato,
  freshCarrot,
  freshTaro,
  apple,
  pear,
  peach,
  grape,
  blueberry,
  frozenGinger,
  frozenGarlic,
  frozenOnion,
  frozenGreenOnion,
  frozenMixedVegetables,
  frozenFruits,
  garlicPaste,
  gingerPaste,
  mincedGarlic,
  mincedGinger,
  mixedVegetables,
  stirFryVegetableMix,
  soupVegetableMix,
  dumplingFilling,
  seasonedVegetableMix,
];

export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug
  );
}

export function getProductsByCategory(
  categorySlug: string
) {
  return products.filter(
    (product) =>
      product.categorySlug === categorySlug
  );
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find(
    (category) => category.slug === slug
  );
}