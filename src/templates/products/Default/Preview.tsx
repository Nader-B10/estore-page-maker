import React from 'react';
import { TemplateProps } from '../../TemplateTypes';
import { Product, ProductSectionData, StoreSettings } from '../../../types/store';
import { themes } from '../../../themes/palettes';

// This component replicates the functionality of the deleted PreviewProductCard
const ProductCardPreview: React.FC<{ product: Product; settings: StoreSettings }> = ({ product, settings }) => {
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-gray-200/10 flex flex-col" style={{ backgroundColor: theme.colors.surface }}>
      <div className="relative overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.category && <span className="px-2 py-1 text-xs font-medium text-black rounded-full" style={{ backgroundColor: settings.accentColor }}>{product.category}</span>}
          {product.isOnSale && product.discountPercentage && <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-{product.discountPercentage}%</span>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2" style={{ color: theme.colors.text }}>{product.name}</h3>
        <p className="text-sm mb-3 line-clamp-2 flex-grow" style={{ color: theme.colors.subtleText }}>{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>{product.price} ر.س</span>
            {product.originalPrice && product.originalPrice > product.price && <span className="text-sm line-through" style={{ color: theme.colors.subtleText }}>{product.originalPrice} ر.س</span>}
          </div>
          <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: settings.secondaryColor }}>
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

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

  const layoutClass = settings.layout === 'list' 
    ? 'grid-cols-1' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  // This JSX replicates the functionality of the deleted PreviewProductSection
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: settings.primaryColor }}>{title}</h2>
        <p className="max-w-2xl mx-auto" style={{ color: theme.colors.subtleText }}>{subtitle}</p>
        <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
      </div>
      <div className={`grid ${layoutClass} gap-6`}>
        {sectionProducts.map(p => <ProductCardPreview key={p.id} product={p} settings={settings} />)}
      </div>
    </section>
  );
};
