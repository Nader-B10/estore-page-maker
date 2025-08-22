import React from 'react';
import { Product, StoreSettings } from '../../types/store';
import PreviewProductCard from './PreviewProductCard';

interface PreviewProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  settings: StoreSettings;
}

export default function PreviewProductSection({ title, subtitle, products, settings }: PreviewProductSectionProps) {
  const getLayoutClass = () => {
    switch (settings.layout) {
      case 'list': return 'grid-cols-1';
      case 'masonry': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
        <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
      </div>
      <div className={`grid ${getLayoutClass()} gap-6`}>
        {products.map((product) => (
          <PreviewProductCard key={product.id} product={product} settings={settings} />
        ))}
      </div>
    </section>
  );
}
