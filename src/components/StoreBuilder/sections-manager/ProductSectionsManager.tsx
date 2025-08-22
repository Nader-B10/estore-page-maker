import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { StoreSettings } from '../../../types/store';

interface ProductSectionsManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ProductSectionsManager({ settings, onUpdateSettings }: ProductSectionsManagerProps) {
  const handleProductSectionChange = (section: string, field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      productSections: {
        ...settings.productSections,
        [section]: {
          ...settings.productSections[section as keyof typeof settings.productSections],
          [field]: value,
        },
      },
    });
  };

  const ProductSectionCard = ({ 
    title, 
    sectionKey, 
    sectionData 
  }: { 
    title: string; 
    sectionKey: string; 
    sectionData: any; 
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => handleProductSectionChange(sectionKey, 'enabled', !sectionData.enabled)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
            sectionData.enabled
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {sectionData.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {sectionData.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <input
            type="text"
            value={sectionData.title}
            onChange={(e) => handleProductSectionChange(sectionKey, 'title', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <input
            type="text"
            value={sectionData.subtitle}
            onChange={(e) => handleProductSectionChange(sectionKey, 'subtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">عدد المنتجات</label>
          <input
            type="number"
            min="1"
            max="12"
            value={sectionData.limit}
            onChange={(e) => handleProductSectionChange(sectionKey, 'limit', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ProductSectionCard
        title="المنتجات المميزة"
        sectionKey="featured"
        sectionData={settings.productSections.featured}
      />
      
      <ProductSectionCard
        title="الأعلى مبيعاً"
        sectionKey="bestSellers"
        sectionData={settings.productSections.bestSellers}
      />
      
      <ProductSectionCard
        title="عروض وتخفيضات"
        sectionKey="onSale"
        sectionData={settings.productSections.onSale}
      />
    </div>
  );
}