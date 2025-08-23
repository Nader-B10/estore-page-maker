import React from 'react';
import { PackageOpen } from 'lucide-react';
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

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header is now always rendered, ensuring title and subtitle are visible */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
        <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
      </div>

      {/* Conditional content: either products or a placeholder */}
      {products.length > 0 ? (
        <div className={`grid ${getLayoutClass()} gap-6`}>
          {products.map((product) => (
            <PreviewProductCard key={product.id} product={product} settings={settings} />
          ))}
        </div>
      ) : (
        <div className="py-10 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">القسم فارغ حالياً</h3>
          <p className="text-gray-500 mt-2">
            قم بإضافة منتجات وتصنيفها كـ "{title}" لتظهر هنا.
          </p>
        </div>
      )}
    </section>
  );
}
