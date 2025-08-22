import React from 'react';
import { FolderOpen, ArrowLeft } from 'lucide-react';
import { Category, StoreSettings } from '../../../types';

interface CategoriesSectionProps {
  categories: Category[];
  settings: StoreSettings;
  productCounts?: Record<string, number>;
}

export default function CategoriesSection({ 
  categories, 
  settings, 
  productCounts = {} 
}: CategoriesSectionProps) {
  const { categorySettings } = settings;
  
  const visibleCategories = categories.filter(cat => cat.isVisible);

  if (visibleCategories.length === 0) return null;

  const getGridCols = () => {
    switch (categorySettings.categoriesPerRow) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            تصفح الفئات
          </h2>
          <p className="text-xl text-gray-600">
            اكتشف منتجاتنا المتنوعة في جميع الفئات
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded" 
            style={{ backgroundColor: settings.accentColor }}
          ></div>
        </div>

        <div className={`grid ${getGridCols()} gap-6`}>
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => window.open(`/products?category=${category.slug}`, '_blank')}
            >
              {/* Category Image */}
              {categorySettings.showCategoryImages && (
                <div className="relative h-48 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.accentColor}20)`
                      }}
                    >
                      <FolderOpen size={48} style={{ color: settings.primaryColor }} />
                    </div>
                  )}
                  
                  {/* Product Count Badge */}
                  {categorySettings.showProductCount && (
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-3 py-1 text-white text-sm font-bold rounded-full shadow-lg"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        {productCounts[category.name] || 0} منتج
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                {categorySettings.showCategoryDescription && category.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  {categorySettings.showProductCount && (
                    <span className="text-sm text-gray-500">
                      {productCounts[category.name] || 0} منتج متاح
                    </span>
                  )}
                  
                  <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-800 transition-colors">
                    <span className="font-medium">تصفح</span>
                    <ArrowLeft size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}