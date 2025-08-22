export * from './product';
export * from './settings';
export * from './theme';
export * from './common';
export * from './category';
export * from './search';

import { StoreSettings } from './settings';
import { Product } from './product';
import { CustomPage } from './common';
import { Category } from './category';

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
  customPages: CustomPage[];
  categories: Category[];
}