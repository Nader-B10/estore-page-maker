import React from 'react';
import HeroSectionEditor from './HeroSectionEditor';
import ProductSectionsEditor from './ProductSectionsEditor';
import AllProductsEditor from './AllProductsEditor';
import WhyChooseUsEditor from './WhyChooseUsEditor';
import FAQEditor from './FAQEditor';
import FooterEditor from './FooterEditor';

/**
 * Defines the structure for a section editor configuration entry.
 * This makes the SectionsManager component scalable and easy to maintain.
 */
export interface SectionEditorConfig {
  key: string;
  title: string;
  Component: React.FC;
}

/**
 * Central configuration for all available section editors in the builder.
 * To add a new section editor, simply add a new object to this array.
 */
export const sectionEditorConfig: SectionEditorConfig[] = [
  { key: 'hero', title: 'قسم البطل (Hero)', Component: HeroSectionEditor },
  { key: 'product-sections', title: 'أقسام المنتجات', Component: ProductSectionsEditor },
  { key: 'all-products', title: 'صفحة جميع المنتجات', Component: AllProductsEditor },
  { key: 'why-choose-us', title: 'لماذا تختارنا', Component: WhyChooseUsEditor },
  { key: 'faq', title: 'الأسئلة الشائعة', Component: FAQEditor },
  { key: 'footer', title: 'التذييل', Component: FooterEditor },
];
