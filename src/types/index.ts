export * from './product';
export * from './settings';
export * from './theme';
export * from './common';

import { StoreSettings } from './settings';
import { Product } from './product';
import { CustomPage } from './common';

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
  customPages: CustomPage[];
}