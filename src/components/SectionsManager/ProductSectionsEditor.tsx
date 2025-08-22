import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { StoreSettings } from '../../types/store';

type SectionKey = 'featuredProducts' | 'bestSellers' | 'onSale' | 'allProducts';

export default function ProductSectionsEditor() {
  const { storeData, updateSection } = useStore();
  const { sections } = storeData.settings;

  const handleSectionChange = (section: SectionKey, field: string, value: any) => {
    updateSection(section, { data: { [field]: value } });
  };

  const handleToggleEnabled = (section: SectionKey) => {
    updateSection(section, { enabled: !sections[section].enabled });
  };

  const SectionEditor = ({ sectionKey, title }: { sectionKey: SectionKey, title: string }) => {
    const sectionData = sections[sectionKey];
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => handleToggleEnabled(sectionKey)} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${sectionData.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {sectionData.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {sectionData.enabled ? 'مفعل' : 'غير مفعل'}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input type="text" value={sectionData.data.title} onChange={(e) => handleSectionChange(sectionKey, 'title', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
            <input type="text" value={sectionData.data.subtitle} onChange={(e) => handleSectionChange(sectionKey, 'subtitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          {'limit' in sectionData.data && (
            <div>
              <label className="block text-sm font-medium mb-2">عدد المنتجات</label>
              <input type="number" min="1" max="12" value={(sectionData.data as any).limit} onChange={(e) => handleSectionChange(sectionKey, 'limit', parseInt(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SectionEditor sectionKey="featuredProducts" title="المنتجات المميزة" />
      <SectionEditor sectionKey="bestSellers" title="الأعلى مبيعاً" />
      <SectionEditor sectionKey="onSale" title="عروض وتخفيضات" />
    </div>
  );
}
