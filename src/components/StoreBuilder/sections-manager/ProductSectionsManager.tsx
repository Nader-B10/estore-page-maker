import React from 'react';
import { StoreSettings } from '../../../types/store';

interface ProductSectionsManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ProductSectionsManager({ settings, onUpdateSettings }: ProductSectionsManagerProps) {
  const handleProductSectionChange = (sectionKey: keyof StoreSettings['productSections'], field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      productSections: {
        ...settings.productSections,
        [sectionKey]: {
          ...settings.productSections[sectionKey],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Featured Products Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">المنتجات المميزة</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.productSections.featured.enabled}
                onChange={(e) => handleProductSectionChange('featured', 'enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم المنتجات المميزة</span>
            </label>
          </div>

          {settings.productSections.featured.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                <input
                  type="text"
                  value={settings.productSections.featured.title}
                  onChange={(e) => handleProductSectionChange('featured', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="المنتجات المميزة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.featured.subtitle}
                  onChange={(e) => handleProductSectionChange('featured', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اختيارنا الأفضل لك"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات المعروضة</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.featured.limit}
                  onChange={(e) => handleProductSectionChange('featured', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">الأعلى مبيعاً</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.productSections.bestSellers.enabled}
                onChange={(e) => handleProductSectionChange('bestSellers', 'enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم الأعلى مبيعاً</span>
            </label>
          </div>

          {settings.productSections.bestSellers.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                <input
                  type="text"
                  value={settings.productSections.bestSellers.title}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="الأعلى مبيعاً"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.bestSellers.subtitle}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="المنتجات الأكثر طلباً"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات المعروضة</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.bestSellers.limit}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* On Sale Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">عروض وتخفيضات</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.productSections.onSale.enabled}
                onChange={(e) => handleProductSectionChange('onSale', 'enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم العروض والتخفيضات</span>
            </label>
          </div>

          {settings.productSections.onSale.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                <input
                  type="text"
                  value={settings.productSections.onSale.title}
                  onChange={(e) => handleProductSectionChange('onSale', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="عروض وتخفيضات"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.onSale.subtitle}
                  onChange={(e) => handleProductSectionChange('onSale', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="وفر أكثر مع عروضنا الخاصة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات المعروضة</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.onSale.limit}
                  onChange={(e) => handleProductSectionChange('onSale', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}