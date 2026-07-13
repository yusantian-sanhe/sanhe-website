import type { Product } from "../../types";

import { apple } from "./apple";
import { freshGarlic } from "./fresh-garlic";
import { freshGinger } from "./fresh-ginger";
import { freshOnion } from "./fresh-onion";
import { freshPotato } from "./fresh-potato";
import { frozenGingerProducts } from "./frozen-ginger-products";
import { frozenVegetables } from "./frozen-vegetables";
import { pear } from "./pear";
import { preparedVegetableProducts } from "./prepared-vegetable-products";

export const products: Product[] = [
  freshGinger,
  freshGarlic,
  freshOnion,
  freshPotato,
  apple,
  pear,
  frozenGingerProducts,
  frozenVegetables,
  preparedVegetableProducts,
];

export {
  apple,
  freshGarlic,
  freshGinger,
  freshOnion,
  freshPotato,
  frozenGingerProducts,
  frozenVegetables,
  pear,
  preparedVegetableProducts,
};