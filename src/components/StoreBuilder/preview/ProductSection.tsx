import React from 'react';
import { Package, MessageCircle } from 'lucide-react';
import { StoreData, PredefinedTheme } from '../../../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  storeData: StoreData;
  sectionType: 'featured' | 'bestSellers' | 'onSale';
  currentTheme: PredefinedTheme;
}

export default function ProductSection({ storeData, sectionType, currentTheme }: ProductSectionProps) {
  const { settings, products } = storeData;
  const sectionConfig = settings.productSections[sectionType];

  if (!sectionConfig.enabled) return null;

  const filteredProducts = products.filter(product => {
    switch (sectionType) {
      case 'featured':
        return product.isFeatured;
      case 'bestSellers':
        return product.isBestSeller;
      case 'onSale':
        return product.isOnSale;
      default:
        return false;
    }
  }).slice(0, sectionConfig.limit);

  const getLayoutClass = () => {
    switch (settings.layout) {
      case 'list':
        return 'grid-cols-1';
      case 'masonry':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  const getSectionColor = () => {
    switch (sectionType) {
      case 'featured':
        return currentTheme.palette.primary;
      case 'bestSellers':
        return currentTheme.palette.secondary;
      case 'onSale':
        return currentTheme.palette.accent;
      default:
        return currentTheme.palette.primary;
    }
  };

  const getFilterParam = () => {
    switch (sectionType) {
      case 'bestSellers':
        return 'bestsellers';
      case 'onSale':
        return 'onsale';
      default:
        return sectionType;
    }
  };

  return (
    <section className="py-16 px-6" style={{ backgroundColor: currentTheme.palette.background }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: getSectionColor() }}>
            {sectionConfig.title}
          </h2>
          <p className="text-xl" style={{ color: currentTheme.palette.textSecondary }}>
            {sectionConfig.subtitle}
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded" 
            style={{ backgroundColor: currentTheme.palette.accent }}
          ></div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className={`grid ${getLayoutClass()} gap-6 mb-12`}>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  settings={settings}
                  currentTheme={currentTheme}
                />
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => window.open(`/products?filter=${getFilterParam()}`, '_blank')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg"
                style={{
                  backgroundColor: `${getSectionColor()}10`,
                  color: getSectionColor(),
                  border: `2px solid ${getSectionColor()}20`
                }}
              >
                <span>عرض جميع {sectionConfig.title}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Package size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              لا توجد منتجات في {sectionConfig.title} بعد
            </h3>
            <p className="text-gray-500 mb-6">
              أضف منتجات وحدد "{getSectionLabel()}" لتظهر هنا
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('switchToProducts'))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: getSectionColor(),
                color: 'white'
              }}
            >
              <Package size={18} />
              إضافة منتجات
            </button>
          </div>
        )}
      </div>
    </section>
  );

  function getSectionLabel() {
    switch (sectionType) {
      case 'featured':
        return 'منتج مميز';
      case 'bestSellers':
        return 'الأعلى مبيعاً';
      case 'onSale':
        return 'عليه عرض/تخفيض';
      default:
        return '';
    }
  }
}