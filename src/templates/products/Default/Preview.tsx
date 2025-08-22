import React from 'react';
import { TemplateProps } from '../../TemplateTypes';
import { Product, ProductSectionData } from '../../../types/store';
import PreviewProductSection from '../../../components/StorePreview/PreviewProductSection';

export const Preview: React.FC<TemplateProps> = ({ storeData, sectionKey }) => {
  if (!sectionKey || !['featuredProducts', 'bestSellers', 'onSale', 'allProducts'].includes(sectionKey)) {
    return null;
  }

  const { settings, products } = storeData;
  const sectionConfig = settings.sections[sectionKey as keyof typeof settings.sections];

  if (!sectionConfig || !sectionConfig.enabled) {
    return null;
  }

  const { title, subtitle } = sectionConfig.data;
  const limit = (sectionConfig.data as ProductSectionData).limit;

  let sectionProducts: Product[] = [];

  switch (sectionKey) {
    case 'featuredProducts':
      sectionProducts = products.filter(p => p.isFeatured);
      break;
    case 'bestSellers':
      sectionProducts = products.filter(p => p.isBestSeller);
      break;
    case 'onSale':
      sectionProducts = products.filter(p => p.isOnSale);
      break;
    case 'allProducts':
      sectionProducts = products;
      break;
  }

  if (limit) {
    sectionProducts = sectionProducts.slice(0, limit);
  }

  if (sectionProducts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <PreviewProductSection
        title={title}
        subtitle={subtitle}
        products={sectionProducts}
        settings={settings}
      />
    </div>
  );
};
