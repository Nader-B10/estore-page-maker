/**
 * مولد HTML و CSS للقالب الافتراضي
 * يستخدم المولدات الموجودة حالياً
 */

import { TemplateGenerator } from '../../types/template';
import { StoreData } from '../../types/store';
import { generateStoreHTML } from '../../utils/generators/htmlGenerator';
import { generateStaticCss } from '../../utils/generators/staticCss';
import { generateStoreJS } from '../../utils/generators/jsGenerator';

export const generator: TemplateGenerator = {
  generateHTML: (storeData: StoreData): string => {
    return generateStoreHTML(storeData);
  },
  
  generateCSS: (storeData: StoreData): string => {
    return generateStaticCss(storeData);
  },
  
  generateJS: (storeData: StoreData): string => {
    return generateStoreJS();
  },
};